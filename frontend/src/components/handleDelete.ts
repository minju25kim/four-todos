import { fetchTodo, deleteTodo } from '../utility/apiServices';

const handleDelete = async (type: string, id: number, setData:any) => {
    try {
      await deleteTodo(id);
      const updatedData = await fetchTodo(type);
      setData(updatedData);
    } catch (error) {
      console.error('Error while deleting todo:', error);
    }
  };

  export default handleDelete;