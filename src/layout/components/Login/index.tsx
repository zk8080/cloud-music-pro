import { sentCaptcha, login } from "@/http/api";
import { loginInfoState } from "@/recoil/layout";
import { IconClose, IconLoading, IconSend } from "@douyinfe/semi-icons";
import { Button, Form, Modal, Toast, Tooltip } from "@douyinfe/semi-ui";
import { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import { useMutation } from "@tanstack/react-query";
import { useCountDown } from "ahooks";
import { Fragment, useState } from "react";
import { useSetRecoilState } from "recoil";
import "./index.scss";

type IProps = ModalReactProps & {
  onClose?: () => void;
};

function Login(props: IProps) {
  const { onClose } = props;
  const setLoginInfo = useSetRecoilState(loginInfoState);
  const [targetDate, setTargetDate] = useState<number>();

  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      setTargetDate(undefined);
    }
  });

  // 发送验证码
  const sendMutation = useMutation(
    (sentParams: { phone: string }) => {
      return sentCaptcha(sentParams);
    },
    {
      onSuccess: async () => {
        setTargetDate(Date.now() + 60000);
        Toast.success({ content: "发送成功，请注意查收", showClose: false });
      }
    }
  );

  // 登录
  const loginMutation = useMutation(
    (loginParams: Record<string, string>) => {
      return login(loginParams);
    },
    {
      onSuccess: async (data) => {
        setTargetDate(undefined);
        if (data.code === 200) {
          setLoginInfo(data.profile || {});
          Toast.success({ content: "登录成功", showClose: false });
          onClose?.();
        }
      }
    }
  );

  return (
    <Modal
      {...props}
      className="login-modal--wrapper"
      width={"auto"}
      centered
      header={null}
      footer={null}
      maskClosable={false}
    >
      <div className="flex h-112">
        <div className="w-56 bg-primary flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl mb-3">💗Music</h1>
          <p className="text-lg">个人学习音乐网站</p>
        </div>
        <Form
          layout="vertical"
          labelPosition="inset"
          className="w-96 flex flex-col px-5 justify-center relative"
          onSubmit={(values) => loginMutation.mutate(values)}
        >
          {({ formState, values, formApi }) => (
            <>
              <IconClose className="absolute top-5 right-5 cursor-pointer text-xl" onClick={onClose} />
              <Form.Input
                field="phone"
                label="手机号码"
                placeholder="请输入手机号"
                className="h-12 phone-input"
                type="number"
                rules={[{ required: true, message: "请输入手机号" }]}
              ></Form.Input>
              <Form.Input
                field="captcha"
                label="验证码"
                placeholder="请输入验证码"
                className="h-12"
                rules={[{ required: true, message: "请输入验证码" }]}
                suffix={
                  <Fragment>
                    {sendMutation.isLoading && <IconLoading className="px-2" spin />}
                    {!sendMutation.isLoading && (
                      <Fragment>
                        {countdown === 0 ? (
                          <Tooltip content="发送验证码">
                            <IconSend
                              className="px-2 cursor-pointer"
                              onClick={async () => {
                                const phone = await formApi.validate(["phone"]);
                                sendMutation.mutate({ phone: phone.phone });
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <span className="px-2 text-gray-500">{Math.round(countdown / 1000)}</span>
                        )}
                      </Fragment>
                    )}
                  </Fragment>
                }
              ></Form.Input>
              <Button
                loading={loginMutation.isLoading}
                type="primary"
                theme="solid"
                htmlType="submit"
                className="mt-5 drop-shadow-xl h-12"
              >
                登录
              </Button>
            </>
          )}
        </Form>
      </div>
    </Modal>
  );
}

export default Login;
