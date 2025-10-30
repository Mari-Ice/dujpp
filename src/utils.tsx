import React, {type ReactElement} from 'react';

interface MultiProviderProps {
  children: any;
  // FIX: Using React.ReactElement instead of deprecated FunctionComponentElement
  providers: ReactElement<any>[];
}

export const MultiProvider = (props: MultiProviderProps) => {
  let content = props.children;

  const numberOfProviders = props.providers.length;

  if (!numberOfProviders) {
    // Providers prop is empty, return children directly
    return content;
  }

  // Iterate over providers in reverse if order matters, but for standard context
  // stacking (Provider A wraps Provider B), the current order is usually correct.
  props.providers.forEach((provider) => {
    // Clones the provider element and inserts the current 'content' as its children
    content = React.cloneElement(provider, provider.props, content);
  });

  return content;
}