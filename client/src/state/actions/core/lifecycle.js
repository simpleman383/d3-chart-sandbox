import { createAction } from "state/utils";

export const actions = {
  APP_LOAD: "[core/lifecycle]:APP_LOAD",
  APP_EXIT: "[core/lifecycle]:APP_EXIT"
};

export const onApplicationLoad = () => createAction({ type: actions.APP_LOAD });

export const onApplicationExit = () => createAction({ type: actions.APP_EXIT });