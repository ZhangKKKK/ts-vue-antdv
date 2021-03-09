import {
  VuexModule,
  Mutation,
  Action,
  getModule,
  Module
} from 'vuex-module-decorators';
import store from '@/store'
import { ITodo } from '@/store/todo-interface'
export interface ITodoState {
  todoList: ITodo[]
}
@Module({ dynamic: true, store, namespaced: true, name: 'todo' })
class Todo extends VuexModule implements ITodoState {

  public todoList: ITodo[] = []

  @Mutation
  public SET_TODOLIST (lists: ITodo[]) {
    this.todoList = lists
  }
  @Mutation
  public REMOVE_TODO (item: ITodo) {
    this.todoList = this.todoList.filter(v => v.id !== item.id)
  }
}

export const TodoModule = getModule(Todo)
