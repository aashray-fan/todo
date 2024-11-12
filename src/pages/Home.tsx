import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";
import { logInfo } from "../logger";
import { tracer } from "../tracer";
import { meter } from "../matrics";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskCounter = meter.createCounter('tasks_added', {
    description: 'Counts the number of tasks added to the todo list',
  });

  useEffect(() => {
    logInfo(JSON.stringify(tasks))
  },[tasks])

  function handleAddTask(newTaskTitle: string) {
    const span = tracer.startSpan('handleAddTask');
    taskCounter.add(1);
  
    const hasTaskWithThisName =
      tasks.findIndex((task) => task.title === newTaskTitle) > -1;
  
    if (hasTaskWithThisName) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      setTasks([
        ...tasks,
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false,
        },
      ]);
    }
  
    span.end(); // End the span
  }
  
  function handleToggleTaskDone(id: number) {
    const span = tracer.startSpan('handleToggleTaskDone');
  
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
  
    setTasks(newTasks);
  
    span.end();
  }
  
  function handleRemoveTask(id: number) {
    const span = tracer.startSpan('handleRemoveTask');
  
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  
    span.end();
  }
  
  function handleUpdateTaskName(id: number, newTaskName: string) {
    const span = tracer.startSpan('handleUpdateTaskName');
  
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: newTaskName,
        };
      }
      return task;
    });
  
    setTasks(newTasks);
  
    span.end();
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        updateTaskName={handleUpdateTaskName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
