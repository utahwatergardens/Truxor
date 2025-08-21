declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': {
      src: string;
      alt?: string;
      'auto-rotate'?: boolean;
      'camera-controls'?: boolean;
      style?: React.CSSProperties;
      className?: string;
    };
  }
}
