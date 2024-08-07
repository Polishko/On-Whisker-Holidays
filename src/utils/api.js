// GET collection
export const fetchData = async (url, dispatch, successType, dataName) => {
  const controller = new AbortController();
  dispatch({ type: "loading" });

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    dispatch({ type: successType, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error);

    if (error.name !== "AbortError") {
      dispatch({
        type: "rejected",
        payload: `There was an error loading ${dataName} data...`,
      });
    }
  }

  return () => {
    controller.abort();
  };
};

//GET item by id
export const fetchItem = async (
  url,
  id,
  dispatch,
  successType,
  currentId,
  dataName
) => {
  const controller = new AbortController();

  if (id === currentId) return;
  dispatch({ type: "loading" });

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    dispatch({ type: successType, payload: data });
  } catch (error) {
    if (error.name !== "AbortError") {
      dispatch({
        type: "rejected",
        payload: `There was an error loading the ${dataName}.`,
      });
    }
  }

  return () => {
    controller.abort();
  };
};

// Separate logic for POST user,  POST comment and POST rating to avoid complexity
// POST item: user
export const createUserApi = async (url, newUser, dispatch) => {
  dispatch({ type: "loading" });

  try {
    // Existing user check
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch users for email check.");
    }

    const users = await response.json();
    const userExists = users.some((user) => user.email === newUser.email);

    if (userExists) {
      dispatch({
        type: "rejected",
        payload: "User with this email already exists.",
      });
      return {
        success: false,
        message: "User with this email already exists.",
      };
    }

    // user creation
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error = await res.json();
      dispatch({
        type: "rejected",
        payload: error.message || "There was an error creating the user.",
      });
      return {
        success: false,
        message: error.message || "There was an error creating the user.",
      };
    }

    const data = await res.json();
    const { user } = data;
    dispatch({ type: "user/created", payload: user });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    dispatch({
      type: "rejected",
      payload: "There was an error creating the user.",
    });
    return { success: false, message: "There was an error creating the user." };
  }
};

// POST item: comment
export const createCommentApi = async (
  commentText,
  hotelId,
  user,
  dispatch,
  url
) => {
  if (!user) {
    dispatch({
      type: "rejected",
      payload: "User not authenticated",
    });
    return { success: false, message: "User not authenticated" };
  }

  dispatch({ type: "loading" });

  try {
    const comment = {
      text: commentText.trim(),
      userId: user.id,
      userName: user.name,
      hotelId: hotelId,
      timestamp: new Date().toISOString(),
    };

    const token = localStorage.getItem("accessToken");

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      dispatch({
        type: "rejected",
        payload: error.message || "Failed to create comment",
      });
      return {
        success: false,
        message: error.message || "Failed to create comment",
      };
    }

    const data = await res.json();
    dispatch({ type: "comment/created", payload: data });
    return { success: true, message: "Comment created successfully" };
  } catch (error) {
    dispatch({
      type: "rejected",
      payload: "There was an error creating the comment.",
    });
    return {
      success: false,
      message: "There was an error creating the comment.",
    };
  }
};

// POST item: add rating
export const addRatingApi = async (
  url,
  newRating,
  dispatch,
  user,
  successType
) => {
  if (!user) {
    dispatch({
      type: "rejected",
      payload: "User not authenticated",
    });
    return { success: false, message: "User not authenticated" };
  }

  const token = localStorage.getItem("accessToken");

  dispatch({ type: "loading" });

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newRating),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      dispatch({
        type: "rejected",
        payload: error.message || "There was an error adding the rating.",
      });
      return {
        success: false,
        message: error.message || "There was an error adding the rating.",
      };
    }

    const data = await res.json();
    dispatch({ type: successType, payload: data });

    return { success: true, message: "Rating added successfully" };
  } catch (error) {
    dispatch({
      type: "rejected",
      payload: "There was an error adding the rating.",
    });
    return { success: false, message: "There was an error adding the rating." };
  }
};

// PUT item:
export const editDataApi = async (
  updatedItem,
  dispatch,
  url,
  successType,
  dataName
) => {
  dispatch({ type: "loading" });

  try {
    const token = localStorage.getItem("accessToken");
    // console.log("Data being sent in PUT request:", updatedItem);

    // PUT edited data
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(updatedItem),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      const errorMessage =
        res.status === 401
          ? "Wrong password."
          : error.message || `There was an error updating the ${dataName}.`;
      dispatch({
        type: "rejected",
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }

    // GET updated item
    const updatedRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!updatedRes.ok)
      throw new Error(`Failed to fetch updated ${dataName} data`);

    const updatedData = await updatedRes.json();
    dispatch({ type: successType, payload: updatedData });

    return {
      success: true,
      message: `${dataName} updated successfully.`,
      data: updatedData,
    };
  } catch (error) {
    dispatch({
      type: "rejected",
      payload: `There was an error updating the ${dataName}.`,
    });
    return {
      success: false,
      message: `There was an error updating the ${dataName}.`,
    };
  }
};

// authenticate user for login
export const authenticateApi = async (
  credentials,
  url,
  usersUrl,
  needUserData = false
) => {
  try {
    // user check
    const usersResponse = await fetch(usersUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!usersResponse.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await usersResponse.json();
    const user = users.find((u) => u.email === credentials.email);

    if (!user) {
      return {
        success: false,
        message: "User does not exist.",
      };
    }

    // attempt authentication
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const error = await response.json();

      return {
        success: false,
        message: error.message || "Wrong password.",
      };
    }

    const data = await response.json();

    if (needUserData) {
      return { success: true, token: data.accessToken, user: data.user };
    } else {
      return { success: true };
    }
  } catch (error) {
    return {
      success: false,
      message: "There was an error processing the request.",
    };
  }
};

// password validation for editing comments
export const validatePasswordForEdit = async (credentials, url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Password validation failed.",
      };
    }

    const data = await response.json();

    return {
      success: true,
      message: "Password validated successfully.",
      token: data.accessToken,
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error processing the request.",
    };
  }
};

// DELETE request
export const deleteDataApi = async (
  url,
  id,
  dispatch,
  successType,
  dataName
) => {
  dispatch({ type: "loading" });

  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`Failed to delete ${dataName}`);

    dispatch({ type: successType, payload: id });

    return { success: true, message: `${dataName} deleted successfully` };
  } catch (error) {
    dispatch({
      type: "rejected",
      payload: `There was an error deleting the ${dataName}.`,
    });
    return {
      success: false,
      message: `There was an error deleting the ${dataName}.`,
    };
  }
};

// Weather API
export const fetchWeatherData = async (latitude, longitude) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current_weather=true`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Something went wrong with weather fetch");
  }

  const data = await response.json();
  return data.current_weather;
};
