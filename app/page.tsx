import { useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;

    const next: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };

    setTodos((prev) => [next, ...prev]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const hasTodos = todos.length > 0;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white px-6 py-6 shadow-sm dark:bg-zinc-900">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            待办列表
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            先写下你今天想完成的事情吧。
          </p>
        </header>

        <section className="flex gap-2">
          <input
            aria-label="待办输入框"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAdd();
              }
            }}
            className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            placeholder="输入待办，例如：写周报"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            添加
          </button>
        </section>

        <section aria-label="待办列表" className="flex flex-col gap-2">
          {!hasTodos ? (
            <p className="rounded-lg border border-dashed border-zinc-200 px-3 py-4 text-center text-sm text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
              还没有待办，先添加一条吧。
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                >
                  <button
                    type="button"
                    aria-pressed={todo.completed}
                    aria-label={todo.completed ? "标记为未完成" : "标记为已完成"}
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex h-5 w-5 items-center justify-center rounded border text-xs transition ${
                      todo.completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-zinc-300 bg-white text-transparent dark:border-zinc-600 dark:bg-zinc-900"
                    }`}
                  >
                    ✓
                  </button>
                  <span
                    className={`flex-1 text-zinc-900 dark:text-zinc-50 ${
                      todo.completed ? "text-zinc-400 line-through" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    type="button"
                    aria-label="删除待办"
                    onClick={() => removeTodo(todo.id)}
                    className="text-xs text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400"
                  >
                    删除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
