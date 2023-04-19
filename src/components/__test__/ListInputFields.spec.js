import { mount, shallowMount } from "@vue/test-utils";

import ListInputField from '../ListInputFields.vue';

describe('it checks if ListInputFields has porops', ()=> {

  test('uses mounts', async () => {
    const wrapper = mount(ListInputField, {
      props: {
        isNewItem: false
      }
    });
  
    await wrapper.setProps( { items: [] }, { editOnIndex: false})
  
    expect(wrapper.props('editOnIndex')).toBe(false)
  })

})