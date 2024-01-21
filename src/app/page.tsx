"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<string[]>([]);

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    // FormからSubmitされたデータをsetTodoに更新する
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const task = data.get("task") as string;
    setTodo([...todo, task]);
    form.reset();
  };

  const deleteTask = (index: number) => {
    setTodo((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full w-full flex justify-center items-start p-10">
      <div className="max-w-[500px] w-full">
        <Card className="space-y-2 p-5">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">What&apos;s new?</p>
          <form onSubmit={submit} className="flex gap-2">
            <Input name="task" />
            <Button>Add</Button>
          </form>
        </Card>

        <Card className="mt-4">
          <h3 className="px-4 py-2 text-lg font-bold tracking-tight">Tasks</h3>
          <hr></hr>

          <ul className="divide-y">
            {todo.length ? (
              todo.map((task, i) => (
                <li key={i} className="p-4 flex justify-between gap-2">
                  {task}
                  <Button
                    size={"icon"}
                    className="w-6 h-6"
                    onClick={() => {
                      deleteTask(i);
                    }}
                  >
                    <Trash2 width={"1em"} />
                  </Button>
                </li>
              ))
            ) : (
              <p className="p-10 text-center">Nothing.</p>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}
