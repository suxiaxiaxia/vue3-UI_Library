import type { Ref, InjectionKey } from "vue";//为ref标注类型
export type NameType = string | number;

export interface CollapseItemProps {
  name: NameType;//独一无二的
  title?: string;
  disabled?: boolean;
}

//没法使用emits和props所以使用透传
export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}
//每次调用 Symbol() 都返回不同的值保证唯一性
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey');

export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}
export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void;
  (e: 'change', values: NameType[]): void;
}