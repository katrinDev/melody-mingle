import { ColorPaletteProp, SnackbarPropsColorOverrides } from "@mui/joy";
import { OverridableStringUnion } from "@mui/types";
import { makeAutoObservable } from "mobx";

export default class SnackbarPropsStore {
  private _isOpen: boolean = false;
  private _color: OverridableStringUnion<
    ColorPaletteProp,
    SnackbarPropsColorOverrides
  > = "success";
  private _text: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }
  public set isOpen(value: boolean) {
    this._isOpen = value;
  }

  public get color(): OverridableStringUnion<
    ColorPaletteProp,
    SnackbarPropsColorOverrides
  > {
    return this._color;
  }

  public set color(
    value: OverridableStringUnion<ColorPaletteProp, SnackbarPropsColorOverrides>
  ) {
    this._color = value;
  }

  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    this._text = value;
  }

  changeAll(
    isOpen: boolean,
    color: OverridableStringUnion<
      ColorPaletteProp,
      SnackbarPropsColorOverrides
    >,
    text: string
  ) {
    this._isOpen = isOpen;
    this._color = color;
    this._text = text;
  }
}
