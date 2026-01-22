import { strategies, type ContextKey } from "./AutocompleteStrategy";
import { useQuery } from "@tanstack/react-query";

interface Props {
  context: ContextKey;
}

function useAutocompleteOptions(props: Props) {
  const { context } = props;

  const optionsQry = useQuery({
    queryKey: ["AutocompleteOptions", context],
    queryFn: strategies[context].fetch,
  });

  return { ...optionsQry, data: optionsQry.data ?? [] };
}

export default useAutocompleteOptions;
