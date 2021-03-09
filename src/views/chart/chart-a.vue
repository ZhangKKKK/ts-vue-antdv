<template>
  <div class="container">
    <a-row>
      <a-col>
        <h3>TODOLIST</h3>
      </a-col>
      <a-col>
        <a-button type="primary" @click="addTodo">添加todo</a-button>
      </a-col>
    </a-row>
    <a-row v-for="item in listData" :key="item.id">
      <a-col :span="6">{{ item.title }}</a-col>
      <a-col :span="10">{{ item.content }}</a-col>
      <a-col :span="4">{{ item.date }}</a-col>
      <a-col :span="4">
        <a-icon type="form" @click="editTodo(item)"/>
      </a-col>
    </a-row>
    <TodoModal ref="TodoModal" :isNew="isNew" :row="row"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {TodoModule} from '@/store/module/todo'
import TodoModal from './components/TodoModal.vue'
@Component({
  components: { TodoModal }
})
export default class ChartA extends Vue {
  private listData: any[] = []
  private isNew: boolean = false
  private row: any = {}

  private created () {
    console.log(TodoModule.todoList)
    console.log(this.listData)
  }

  private addTodo (): void {
    this.isNew = true;
    this.row = {};
    (this.$refs.TodoModal as any).visible = true
  }

  private editTodo (item: any): void {
    this.isNew = false;
    this.row = item;
    (this.$refs.TodoModal as any).visible = true
  }
}
</script>
