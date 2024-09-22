import { type ButtonAnimationOnHover, type ButtonProps } from './Button.types';

const buttonVariantClassNameMap = new Map<ButtonProps['v'], string>([
  ['primary', 'h-button-primary'],
  ['secondary', 'h-button-secondary'],
  ['tertiary', 'h-button-tertiary'],
  ['noir', 'h-button-noir']
]);

const buttonSizeClassMap = new Map<ButtonProps['size'], string>([
  ['small', 'h-button-size-small'],
  ['medium', 'h-button-size-medium'],
  ['large', 'h-button-size-large']
]);

const buttonAnimationOnHoverClassMap = new Map<ButtonAnimationOnHover, string>([
  ['background-transition', 'h-button-hover'],
  ['raise-elevation', 'hover-raise-elevation-100'],
  ['scale-content', 'hover-scale-200']
]);

function getHoverAnimation(type: ButtonAnimationOnHover, variant: ButtonProps['v'] = 'primary') {
  if (type === 'background-transition') {
    return buttonAnimationOnHoverClassMap.get(type) + `-${variant}`;
  } else {
    return buttonAnimationOnHoverClassMap.get(type);
  }
}

export { buttonAnimationOnHoverClassMap, buttonSizeClassMap, buttonVariantClassNameMap, getHoverAnimation };
