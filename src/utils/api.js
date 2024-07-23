// GET collection
export const fetchData = async (
  url,
  dispatch,
  successType,
  dataType,
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
        payload: `There was an error loading ${dataType} data...`,
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
  dataType,
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
        payload: `There was an error loading the ${dataType}.`,
      });
    }
  }

  return () => {
    controller.abort();
  };
};

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
