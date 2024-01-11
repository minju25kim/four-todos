const API_URL = "http://localhost:8080/todo";

export const fetchTodo = async (type?: string): Promise<any> => {
  try {
    let url = `${API_URL}`;
    if (type) {
        url = `${API_URL}/${type}`;
    }
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("There was a problem with the GET request:", error);
    throw error;
  }
};

export const postTodo = async (json: any): Promise<void> => {
  try {
    const result = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    if (!result.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error posting todo:", error);
    throw error;
  }
};

export const updateTodo = async (id: any, json: any): Promise<void> => {
  try {
    const result = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    if (!result.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id: any): Promise<void> => {
  try {
    const result = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!result.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
