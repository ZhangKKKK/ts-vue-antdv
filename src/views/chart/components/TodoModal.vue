<template>
  <a-modal v-model="visible" :title="title" :maskClosable="false" @submit="handleOk">
    <a-form :form="form">
      <a-form-item label="标题：" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-input v-decorator="['title', { initialValue: row.title, rules: rules.title }]"></a-input>
      </a-form-item>
      <a-form-item label="内容：" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-input v-decorator="['content', { initialValue: row.content }]"></a-input>
      </a-form-item>
    </a-form>
    <div slot="footer">
      <!-- <a-button @click="visible = false">取消</a-button> -->
      <a-button type="primary" html-type="submit">确定</a-button>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component
export default class TodoModal extends Vue {
  @Prop({ type: Boolean, default: true }) public isNew!: boolean;
  @Prop({ type: Object, default: () => null }) public row?: any;

  private title: string = '添加返点配置'
  private visible: boolean = false
  private form = this.$form.createForm(this)
  private rules = {
        validateTrigger: ['blur'],
        title: [
          { required: true, message: '请输入标题!' }
        ]
      }
  @Watch('isNew')
  private getIsNew (val: boolean) {
    console.log(val)
    this.isNew = val
    this.title = val ? '添加返点配置' : '修改返点配置'
  }

  @Watch('row', { deep: true })
  private getRow (val: any) {
    this.row = val
  }

  private handleOk (e: any) {
    console.log(e)
    e.preventDefault();
    this.form.validateFields((err, values) => {
      console.log('valid')
      if (!err) {
        const params = Object.assign({}, values)
        console.log(params)
        if (!this.isNew) {
          console.log('修改')
          return
        }
        console.log('添加')
      }
    })
  }

  private reset () {
    if (this.form) {
      this.form.resetFields()
    }
  }

}
</script>
