type ExtractFieldNames<T> = keyof T;

type ExcludeField<T, K extends keyof T> = Omit<T, K>;

type StateAction<T> = React.Dispatch<React.SetStateAction<T>>