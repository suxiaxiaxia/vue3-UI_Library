//type.ts

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;//简单的
  round?: boolean;//椭圆
  circle?: boolean;//圆形
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  icon?: string;//图标
  loading?: boolean;//加载中...
}
//类型定义辅助，让App.vue能写出严格类型
export interface ButtonInstance {
  ref: HTMLButtonElement;
}