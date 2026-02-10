"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <main className="min-h-screen font-sans antialiased">
      {/* 背景：柔和渐变 + 点缀 */}
      <div
        className="fixed inset-0 -z-10 bg-[linear-gradient(165deg,_#fafafa_0%,_#f4f4f5_50%,_#e4e4e7_100%)] dark:bg-[linear-gradient(165deg,_#0c0c0c_0%,_#18181b_50%,_#27272a_100%)]"
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-10 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgb(251 191 36 / 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgb(59 130 246 / 0.06) 0%, transparent 50%)`,
        }}
        aria-hidden
      />

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* 卡片 */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 px-6 py-8 shadow-xl shadow-zinc-200/50 backdrop-blur-sm dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:shadow-none">
            <header className="mb-6 flex flex-col gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                待办列表
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                先写下你今天想完成的事情吧。
              </p>
              <p
                className="inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400"
                aria-live="polite"
              >
                <span className="size-1.5 rounded-full bg-emerald-500" />
                当前时间：{now.toLocaleString()}
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
                className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                placeholder="输入待办，例如：写周报"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="shrink-0 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-600 active:scale-[0.98] dark:bg-amber-600 dark:hover:bg-amber-500"
              >
                添加
              </button>
            </section>

            <section
              aria-label="待办列表"
              className="mt-6 flex flex-col gap-2"
            >
              {!hasTodos ? (
                <p className="rounded-xl border border-dashed border-zinc-200 px-4 py-6 text-center text-sm text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
                  还没有待办，先添加一条吧。
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3 py-2.5 text-sm transition dark:border-zinc-700/80 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60"
                    >
                      <button
                        type="button"
                        aria-pressed={todo.completed}
                        aria-label={
                          todo.completed ? "标记为未完成" : "标记为已完成"
                        }
                        onClick={() => toggleTodo(todo.id)}
                        className={`flex size-6 shrink-0 items-center justify-center rounded-lg border text-xs transition ${
                          todo.completed
                            ? "border-amber-500 bg-amber-500 text-white"
                            : "border-zinc-300 bg-white text-transparent dark:border-zinc-600 dark:bg-zinc-800"
                        }`}
                      >
                        ✓
                      </button>
                      <span
                        className={`flex-1 text-zinc-900 dark:text-zinc-50 ${
                          todo.completed
                            ? "text-zinc-400 line-through"
                            : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        type="button"
                        aria-label="删除待办"
                        onClick={() => removeTodo(todo.id)}
                        className="shrink-0 text-xs text-zinc-400 transition hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400"
                      >
                        删除
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
