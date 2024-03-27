export type ReactComponent = ComponentType<any> | ReactElement | undefined;

export type ModelDeligate =
  | UserDeligate
  | MemoDeligate
  | ProductDeligate
  | ProductDetailDeligate;
export interface ResourceMapIF {
  [key: string]: {
    list?: ReactComponent;
    show?: ReactComponent;
    edit?: ReactComponent;
    create?: ReactComponent;
    icon?: ReactComponent;
    resource: string;
  };
}

type RecordValue = Record<string, any>;
