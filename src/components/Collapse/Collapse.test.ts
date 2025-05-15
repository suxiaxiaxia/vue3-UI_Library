import { describe, test } from "vitest";
import { mount } from "@vue/test-utils";
import Collapse from "./Collapse.vue";

describe('Collapse.vue', () => {
  test('basic collapse', () => {
    const wrapper = mount(Collapse, {
      slots: {
        default: ''
      }
    })
    console.log(wrapper.html());

  })
})