import { FlexItemOrientationShorthand, FlexboxCN, FlexboxProps } from './Flexbox.types';

const SPACING_PROPERTIES = ['m', 'p'] as const;
const SPACING_DIRECTIONS = ['', 't', 'l', 'b', 'r'] as const;
const SPACING_SCALAR_UNITS = ['100', '200', '300'] as const;
const SPACING_SIZE_GROUPS = ['sm', 'md', 'lg'] as const;

function merge() {
  let spacingClassNames = [];
  for (const size of SPACING_SIZE_GROUPS) {
    for (const scale of SPACING_SCALAR_UNITS) {
      if (size !== 'lg' && scale === '300') {
        continue;
      }

      for (const property of SPACING_PROPERTIES) {
        for (const dir of SPACING_DIRECTIONS) {
          spacingClassNames.push(`${property}${dir}-${size}${scale}`);
        }
      }
    }
  }

  return spacingClassNames;
}

let spacingClassNames = merge();

export function pickSpacingClassNames(spacing: string) {
  return spacing
    .split(' ')
    .filter((str) => spacingClassNames.includes(str))
    .join(' ');
}

export function pickDirClassName(dir: FlexboxProps['dir']) {
  switch (dir) {
    case 'col':
      return FlexboxCN.COL;
    case 'row':
      return FlexboxCN.ROW;
    case 'colr':
      return FlexboxCN.COLR;
    case 'rowr':
      return FlexboxCN.ROWR;
  }
}

export function pickArrangement(arrange: FlexboxProps['arrange']) {
  if (typeof arrange === 'undefined') return '';
  const [justify, align = ''] = arrange.split(' ');

  let classNames = [];

  switch (justify) {
    case 'start': {
      classNames.push(FlexboxCN.JC_START);
      break;
    }
    case 'center': {
      classNames.push(FlexboxCN.JC_CENTER);
      break;
    }
    case 'end': {
      classNames.push(FlexboxCN.JC_END);
      break;
    }
    default: {
    }
  }

  switch (align) {
    case 'start': {
      classNames.push(FlexboxCN.ALI_START);
      break;
    }
    case 'center': {
      classNames.push(FlexboxCN.ALI_CENTER);
      break;
    }
    case 'end': {
      classNames.push(FlexboxCN.ALI_END);
      break;
    }
    default: {
    }
  }

  return classNames.join(' ');
}

export function pickGap(gap: FlexboxProps['gap']) {
  switch (gap) {
    case 'sm':
      return FlexboxCN.GAP_SM;
    case 'md':
      return FlexboxCN.GAP_MD;
    case 'lg':
      return FlexboxCN.GAP_LG;
    default:
      return '';
  }
}
