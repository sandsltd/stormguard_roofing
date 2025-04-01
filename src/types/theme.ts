export interface Theme {
  primaryColor?: string;
  secondaryColor?: string;
  text?: string;
  background?: string;
  header?: {
    backgroundColor?: string;
    textColor?: string;
    linkColor?: string;
    linkHoverColor?: string;
    iconColor?: string;
  };
  footer?: {
    backgroundColor?: string;
    textColor?: string;
    linkColor?: string;
    linkHoverColor?: string;
  };
  buttons?: {
    primary?: {
      backgroundColor?: string;
      textColor?: string;
      hoverBackgroundColor?: string;
      hoverTextColor?: string;
    };
    secondary?: {
      backgroundColor?: string;
      textColor?: string;
      hoverBackgroundColor?: string;
      hoverTextColor?: string;
    };
  };
} 