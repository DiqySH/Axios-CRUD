import "./App.css";
import { useForm } from "react-hook-form";
import useUser from "./hooks/useUser";

interface User {
  name: string;
  username: string;
  age: number;
}

function App() {
  const { register, handleSubmit, reset } = useForm<User>();
  const { createUser, data } = useUser();

  const onSubmit = (data: User) => {
    createUser(data.name, data.username, data.age);
    reset();
  };

  return (
    <main className="w-full min-h-screen bg-black">
      <div className="fixed bottom-0 right-0 bg-white px-3 py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col">
            <span>Name</span>
            <input
              type="text"
              className="outline-black border-black border-1 border-solid"
              {...register("name", { required: true })}
            />
          </label>
          <label className="flex flex-col">
            <span>Username</span>
            <input
              type="text"
              className="outline-black border-black border-1 border-solid"
              {...register("username", { required: true })}
            />
          </label>
          <label className="flex flex-col">
            <span>Age</span>
            <input
              type="number"
              className="outline-black border-black border-1 border-solid"
              {...register("age", { required: true })}
            />
          </label>
          <input
            type="submit"
            value={"Create"}
            className="bg-black text-white px-2 w-full py-1 mt-3"
          />
        </form>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {data.map((user, idx) => {
          return (
            <div key={idx} className="bg-white px-2 py-2 text-black w-fit">
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Name: {user.age}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
