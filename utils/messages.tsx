export const validationMessages = {
    empty: {
        username: 'نام کاربری الزامیست',
        password: 'رمز عبور الزامیست',
        repeatPassword: 'تکرار رمز عبور الزامیست',
        phoneNumber: 'شماره موبایل الزامیست',
        email: 'آدرس ایمیل الزامیست',
        code: 'کد یکبار مصرف الزامیست',
        articleTitle: 'عنوان برای پست الزامیست',
        articleBody: 'متن بدنه برای پست الزامیست',
        categoryId: 'حداقل یک مورد از لیست ها برای پست جدید باید انتخاب شود',
        articleBanner: 'انتخاب تصویر برای پست الزامیست',
        avatar: 'انتخاب تصویر پروفایل الزامیست',
    },
    length: {
        usernameShort: 'نام کاربری باید حداقل شامل ۴ حرف باشد',
        usernameLong: 'نام کاربری باید حداکثر شامل ۲۰ حرف باشد',
        bioShort: 'متن معرفی شما باید حداقل شامل ۴ حرف باشد',
        bioLong: 'متن معرفی شما باید حداکثر شامل ۱۵۰ حرف باشد',
        displayNameShort: 'نام نمایشی شما باید حداقل شامل ۴ حرف باشد',
        displayNameLong: 'نام نمایشی شما باید حداکثر شامل ۵۰ حرف باشد',
    },
    invalid: {
        username: 'نام کاربری شامل حروف انگلیسی و اعداد می باشد',
        phoneNumber: 'شماره موبایل وارد شده معتبر نیست',
        email: 'آدرس ایمیل وارد شده معتبر نیست',
        code: 'کد یکبار مصرف معتبر نیست',
        password: 'رمزعبور باید حداقل شامل حروف و عدد به طول ۸ کاراکتر باشد',
        repeatPassword: 'رمز عبور و تکرار آن با هم برار نیستند',
    },
};

export const appMessages = {
    unauthorized: 'نشست از بین رفته است لطفا مجدد لاگین کنید',
    somethingWentWrong: 'خطایی در سامانه رخ داده است',
    codeSent: 'کد تایید برای شماره موبایل مورد نظر ارسال گردید',
    codeSentEmail: 'کد تایید برای ایمیل مورد نظر ارسال گردید',
    registrationVerified: 'ثبت نام با موفقیت انجام شد',
    loggedIn: 'با موفقیت وارد سامانه شدید',
    loggedOut: 'از حساب خود خارج شدید',
    updatedSuccessfully: 'تغییرات با موفقیت اعمال شد',
}
