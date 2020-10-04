export const addToCurrentData = (data) => ({
  type: "add_to_current_data",
  payload: data,
});

export const addCurrentDataToSessions = () => ({
  type: "add_current_data_to_sessions",
});

export const resetCurrentData = () => ({
  type: "reset_current_data",
});

export const deleteSession = (sessionIndex) => ({
  type: "delete_session_at_index",
  payload: sessionIndex,
});
