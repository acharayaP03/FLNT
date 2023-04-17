import { mount, shallowMount } from "@vue/test-utils";

import ListInputField from '../ListInputFields.vue';


test('uses mounts', async () => {
  const wrapper = mount(ListInputField, {
    props: {
      isNewItem: false
    }
  });

  expect(wrapper.find('button'))

})