import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";

const INITIAL_STATE = { loading: false, data: {} };
const reducer = (state, action) => {
  console.log("state", state, "action", action);
  if (action.type === "REQUEST") {
    return { ...state, loading: true };
  }
  if (action.type === "SUCCESS") {
    return { ...state, loading: false, data: action.data };
  }
  return state;
};

const init = baseUrl => {
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const carregar = useCallback(async () => {
      dispatch({ type: "REQUEST" });
      const res = await axios.get(baseUrl + resource + ".json");

      if (res.status === 200) {
        dispatch({ type: "SUCCESS", data: res.data });
      }
    }, [resource]);

    useEffect(() => {
      carregar();
    }, [carregar, resource]);
    return { ...data, refetch: carregar };
  };

  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const post = async data => {
      dispatch({ type: "REQUEST" });
      const res = await axios.post(baseUrl + resource + ".json", data);

      if (res.status === 200) {
        dispatch({ type: "SUCCESS", data: res.data });
      }
    };
    return [data, post];
  };
  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const remove = async resource => {
      dispatch({ type: "REQUEST" });
      const res = await axios.delete(baseUrl + resource + ".json");

      if (res.status === 200) {
        dispatch({ type: "SUCCESS" });
      }
    };
    return [data, remove];
  };
  return { useGet, usePost, useDelete };
};

export default init;
