// fetch collection request
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

//fetch item request
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
