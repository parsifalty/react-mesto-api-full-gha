import React from "react";
import FailSvg from "../images/Fail.svg";
import SuccessSvg from "../images/Success.svg";
import CloseButton from "../images/CloseIcon.svg";

export default function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${props.isOpen && `popup_active`}`}
    >
      <div className={`popup__container popup__container_type-infoToolTip`}>
        <img
          className={`popup__tooltip_image`}
          src={props.isSuccess ? `${SuccessSvg}` : `${FailSvg}`}
          alt={props.isSuccess ? "успешно" : "ошибка"}
        />
        <p className={`popup__tooltip_text`}>
          {props.isSuccess
            ? "Вы успешно зарегестрировались"
            : "Что-то пошло не так. Попробуйте ещё раз!"}
        </p>
        <img
          src={`${CloseButton}`}
          alt={`Кнопка закрытия`}
          className={`popup__close-button`}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
