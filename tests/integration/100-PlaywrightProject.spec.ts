import {test, expect}  from '@playwright/test'
import { TodoPage } from '../../pages/TodoPage'

test.describe('todo tests', () => {
  let todoPage: TodoPage
  const activities = ['Workout', 'Sleep', 'Eat', 'Code', 'Play Guitar'];
  const [workout, sleep, eat, code, playGuitar] = activities;
  const validTodo = 'Read a book';
  const longTodo = 'This task name is way too long and exceeds the limit';
  const errorMessages = {
    noTask: 'No tasks found!',
    longTask: 'Error: Todo cannot be more than 30 characters!',
    duplicateTask: (item: string) => `Error: You already have ${item} in your todo list.`
  };

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page)
    await todoPage.goto()
  })
test('Test Case 01 - Todo-App Modal Verification', async() => {
  await expect(todoPage.modalHeader).toContainText('My Tasks')
  const ifEnabled = [todoPage.inputBox, todoPage.addbttn, todoPage.searchbox]
  ifEnabled.forEach(async (el)=> {
    await expect(el).toBeEnabled()
  }) 
  await expect(todoPage.noItemsfound).toHaveText('No tasks found!')
  
})
 
test('Test Case 02 - Single Task Addition and Removal', async() => {
  await todoPage.addTodo('Workout')
  await expect(todoPage.todoItems).toBeVisible()
  await expect(todoPage.todoItems).toHaveCount(1)
  await todoPage.checkComplete.click()
  await todoPage.remove('Workout')
  await todoPage.addTodo('Workout')
  await todoPage.checkComplete.click()
  await todoPage.checkedItemremove.click()
  await expect(todoPage.noItemsfound).toHaveText('No tasks found!')
})

test('Test Case 03 - Multiple Task Operations', async() => {
  
  
    await todoPage.addTodo(workout)
    await todoPage.addTodo(sleep)
    await todoPage.addTodo(eat)
    await todoPage.addTodo(code)
    await todoPage.addTodo(playGuitar)

  const arr = await todoPage.checkComplete.all()
    for (const el of arr) {
      await el.click()
    }
  
    await todoPage.checkedItemremove.click()
    await expect(todoPage.noItemsfound).toHaveText('No tasks found!')
})

test('Test Case 04 - Search and Filter Functionality in todo App', async () => {

  for (const activity of activities) {
    await todoPage.addTodo(activity);
  }
  const todoItems = await todoPage.todoItems.allTextContents();
  expect(todoItems).toEqual(activities);


  for (const activity of activities) {
    await todoPage.searchbox.fill(activity);
    const filteredItems = await todoPage.todoItems.allTextContents();
    expect(filteredItems).toEqual([activity]);

    await expect(todoPage.todoItems).toHaveCount(1);
  }
})

test('Test Case 05 - Task Validation and Error Handling', async() => {
   // Attempt to add an empty task
   await todoPage.addTodo('');
   await expect(todoPage.noItemsfound).toHaveText(errorMessages.noTask);
   await todoPage.addTodo(longTodo);
   await expect(todoPage.errorMessage).toHaveText(errorMessages.longTask);
   await todoPage.addTodo(validTodo)
   await expect(todoPage.todoItems).toHaveCount(1);
   await todoPage.addTodo(validTodo);
   await expect(todoPage.errorMessage).toHaveText(errorMessages.duplicateTask(validTodo));
 });

  })


