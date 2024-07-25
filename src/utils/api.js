// GET collection
export const fetchData = async (
  url,
  dispatch,
  successType,
  dataName,
  transformData = (data) => data
) => {
  const controller = new AbortController();
  dispatch({ type: "loading" });

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    dispatch({ type: successType, payload: transformData(data) });
  } catch (error) {
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
  dataName,
  transformData = (data) => data
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
    dispatch({ type: successType, payload: transformData(data) });
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

// Separate logic for POST user and POST comment to avoid complexity
// POST item: user
export const createUserApi = async (url, newUser, dispatch) => {
  dispatch({ type: "loading" });

  try {
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

// Authentication for user login and data editing
export const authenticateApi = async (
  credentials,
  url,
  needUserData = false
) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error = await res.json();
      return {
        success: false,
        message:
          error.message ||
          (needUserData
            ? "Authentication failed."
            : "Password validation failed."),
      };
    }

    const data = await res.json();

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