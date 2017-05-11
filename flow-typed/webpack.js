// @flow

type WebpackModule = {
  hot: ?{
    accept: (mods: string, callback: Function) => void;
  };
}

declare var module: WebpackModule
