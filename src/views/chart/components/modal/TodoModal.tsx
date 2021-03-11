

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component
export default class TodoModal extends Vue {
  @Prop({ type: Boolean, default: true }) public isNew!: boolean;
  @Prop({ type: Object, default: () => null }) public row?: any;

  public visible: boolean = false
  private title: string = '添加返点配置'
  private form = this.$form.createForm(this)


  @Watch('isNew')
  private getIsNew (val: boolean) {
    console.log(val)
    this.isNew = val
    this.title = val ? '添加待办' : '修改待办'
  }

  @Watch('row', { deep: true })
  private getRow (val: any) {
    this.row = val
  }


  private render () {
    const modelProp = {
      title: this.title,
      maskClosable: false
    }
    const col = {
      'label-col': { span: 6 },
      'wrapper-col' : { span: 18 }
    }
    return (
      <a-modal vModel={this.visible} { ...{ props: modelProp } } forceRender>
        {/* 此表单有毒 */}
        {/* <a-form form={this.form} onSubmit={this.handleOk} selfUpdate={true}>
          <a-form-item {...{ props: col }} label='标题'>
            <a-input/>
          </a-form-item>
          <a-form-item {...{ props: col }} label='内容'>
            <a-input/>
          </a-form-item>
        </a-form> */}
        <div slot='footer'>
          <a-button onClick={this.closeModal}>取消</a-button>
          <a-button type='primary' htmlType='submit'>确定</a-button>
        </div>
      </a-modal>
    )
  }

  private handleOk (e: any) {
    e.preventDefault();
    console.log('valid')
    const params = Object.assign({}, this.form.getFieldsValue())
    console.log(params)
    if (!this.isNew) {
      console.log('修改')
      return
    }
    console.log('添加')
  }

  private closeModal () {
    this.visible = false
  }

  private reset () {
    if (this.form) {
      this.form.resetFields()
    }
  }

}
