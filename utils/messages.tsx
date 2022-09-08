export const validationMessages = {
    empty: {
        username: 'نام کاربری الزامیست',
        password: 'رمز عبور الزامیست',
        repeatPassword: 'تکرار رمز عبور الزامیست',
        phoneNumber: 'شماره موبایل الزامیست',
        code: 'کد یکبار مصرف الزامیست',
    },
    length: {
        usernameShort: 'نام کاربری باید حداقل شامل ۴ حرف باشد',
        usernameLong: 'نام کاربری باید حداکثر شامل ۲۰ حرف باشد',
    },
    invalid: {
        username: 'نام کاربری باید شامل حروف انگلیسی باشد',
        phoneNumber: 'شماره موبایل وارد شده معتبر نیست',
        code: 'کد یکبار مصرف معتبر نیست',
        password:
            'رمز عبور باید ۸ کاراکتر و شامل حروف کوچک ، بزرگ ، اعداد و کاراکتر های ویژه باشد ',
        repeatPassword: 'رمز عبور و تکرار آن با هم برار نیستند',
    },
};

export const appMessages = {
    unauthorized: 'نشست از بین رفته است لطفا مجدد لاگین کنید',
    somethingWentWrong: 'خطایی در سامانه رخ داده است',
    codeSent: 'کد تایید برای شماره موبایل مورد نظر ارسال گردید',
    registrationVerified: 'ثبت نام با موفقیت انجام شد',
    loggedIn: 'با موفقیت وارد سامانه شدید',
    loggedOut: 'از حساب خود خارج شدید'
}
