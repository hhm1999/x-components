import { mount } from '@vue/test-utils'
import Btn from '../btn'

describe('Btn', () => {
  it('显示正确', () => {
    const wrapper = mount({
      render() {
        return <Btn>按钮</Btn>
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('禁用正常', () => {
    const wrapper = mount({
      data() {
        return {
          isClick: false,
        }
      },
      methods: {
        testClick() {
          this.isClick = true
        },
      },
      render() {
        return <Btn disabled onClick={this.testClick}>按钮</Btn>
      }
    })
    expect(wrapper.find('.disabled').exists()).toBe(true)
    wrapper.trigger('click')
    expect(wrapper.vm.isClick).toBe(false)
  })
})