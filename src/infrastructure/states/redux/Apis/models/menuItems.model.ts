export type menuItemKeys =
  | "student" //"خدمات دانشجویی"
  | "studentCardMain"

  // DORM V1
  | "room"
  | "request" // درخواست ها
  | "dorms" // خوابگاه
  | "DormitoryResidents" //"ساکنین خوابگاه"
  | "timing"
  | "timingReserve"
  | "rating"
  | "dormitorySemester"
  | "Pricing"
  | "basePrice"
  | "paymentRules"
  | "factor"

  //BUSINESS
  | "businessMain"
  | "usersList"
  | "myUsers"
  | "businessRequests"

  // NOTIFICATION
  | "Notifications"
  | "notificationManager" // مدیریت اعلان

  // TICKET
  | "ticket"
  | "tickets" // "تیکت ها"
  | "prioritize" //"اولویت بندی" تیکت

  // FINANCIAL
  | "financial" //مالی

  // FINANCIAL V2
  | "financial2" // مالی
  | "accountingTransactions" // تراکنش‌ها
  | "accountingAccountants" //حسابداران
  | "accountingTurnOver" // حسابداری و گردش مالی
  | "overview" // نمايه کلي
  | "accountingInvoicesAndDocs" // فاکتور ها و اسناد
  | "accountingBusinessOwners" //مالکين کسب و کار
  | "accountingRequests" // درخواست ها
  | "accountingOnAccountRequest" // درخواست های علی الحساب
  | "accountingRefundAccountRequest" // درخواست های عودت وجه
  | "accountingMyAccounting" // حسابداری من
  | "accountingMyBranchTurnOver" // گردش مالی من
  | "accountingMyBusinessTurnOver" // گردش مالی کسب و کار من
  | "accountingMyBranchInvoicesAndDocs" // فاکتور ها و اسناد من
  | "accountingMyBusinessInvoicesAndDocs" // فاکتور ها و اسناد کسب و کار من
  | "accountingBuyers" // خريداران
  | "accountingOperation" // عملیات مالی

  // COMMITTEE
  | "committee"
  | "investigationProcess"
  | "reports" // گزارش ها
  | "accusations" //اتهام ها
  | "appealAccusation" //تجدید اتهام ها
  | "centralAccusation" //اتهام ها مرکزی
  | "expressedViews" // آرا صادره
  | "executionOfJudgments" // "اجرای احکام"
  | "committees"
  | "sessions" //جلسات
  | "workingCalendar" // تقویم  کاری
  | "inquiry"
  | "temporaryRecordKeeping"
  | "requests"
  | "confirmRequests"
  | "individualInquiry"
  | "employees"
  | "roles"
  | "licenses"
  | "accessManagement"
  | "accusationDetails"
  | "accusation"
  | "aggravatingFactors"
  | "additionalPunishments"
  | "generalPunishments"
  | "classificationOfAccusations"
  | "rulesAndRegulations"
  | "timingInfo"
  | "committeeDefinition"
  | "committeeDefinitionPreliminary" // تعریف کمیته بدوی
  | "committeeDefinitionAppeal" // تعریف کمیته تجدید
  | "committeeDefinitionCentral" // تعریف کمیته مرکزی
  | "committeeDefinitionRealization" // تعریف کمیته تفهیم
  | "basicInformation"
  | "protection" // حراست
  | "studentVicePresident" //معاون دانشجویی
  | "educationalAssistant" //معاون آموزشی
  | "researchAssistant" // معاون پژوهشی
  | "realizationCommitte"
  | "counselingCenter"
  | "supplementaryResearch"
  | "realizationCommitteDocuments" // پرونده ها کمیته تفهیم
  | "committee"
  | "counselingCenterDocuments"
  | "counselingCenterSessions"
  // REPORTS
  | "dormitoryReports" // گزارش ها لیست خوابگاه
  | "requestReports" // گزارش لیست درخواست ها
  | "financialReports" // گزارش مالی
  | "studentReports" // گزارش کارت دانشجویی
  | "myReports" // گزارش من
  | "allRestaurantReport" // گزارش غذا همه سلف ها
  | "restaurantsReport" //  گزارش غذا  سلف های من
  | "allVendorsReport" // گزارش غذا همه سلف ها
  | "myVendorsReport" //  گزارش غذا  سلف های من
  | "allContractsReport" // گزارش غذا همه قرارداد ها
  | "myContractsReport" //  گزارش غذا  قرارداد های من
  | "allProductsReport" // گزارش غذا همه غذا ها
  | "myProductsReport" //  گزارش غذا  غذا های من
  | "allPlansReport" // گزارش  برنامه غذا همه غذا ها
  | "myPlansReport" //  گزارش  برنامه غذا  غذا های من
  | "allReservationReport" // گزارش سفارشات
  | "myReservationReport" // گزارش سفارشات من
  | "foodDeliveryReport" // گزارش تحویل دهندگان
  | "returnedMoneyReport" // گزارش عودت وجه
  | "myFoodCancellationReport" // گزارش لغو شده های من
  | "allFoodCancellationReport" // گزارش لغو شده ها
  // INSURANCE
  | "requestInsurance" // درخواست بیمه
  // FOOD
  | "restaurants" // سلف های من
  | "allRestaurant" // همه ی سلف ها
  | "myVendors" // تامین کننده های من
  | "allVendors" // همه تامین کننده ها
  | "myContracts" // قرارداد های من
  | "allContracts" // همه ی قرارداد ها
  | "myProducts" // غذا های من
  | "allProducts" // همه ی غذا ها
  | "myPlans" // همه ی غذا ها
  | "allPlans" // همه ی غذا ها
  | "allReservation" // همه سفارش ها
  | "myReservation" // سفارش های من
  | "foodDelivery" // تحویل دهندگان
  | "returnedMoney" // عودت وجه
  | "allFoodCancellation" // همه لغو شده ها
  | "myFoodCancellation" //  لغو شده های من
  // dorm v2
  | "residentsV2"
  | "userRequestsV2"
  | "docRequestsV2"
  | "rulesV2"
  | "rulesPlans2"
  | "dormitoriesV2"
  | "dormBaseInfoV2"
  | "reportsV2"
  | "statisticsReportsV2"
  | "accessManagementV2"
  //setting
  | "serviceManagement"
  | "bannersManagement"
  | "faqManagement"
  //international
  | "coureRules"
  | "studyGroups"
  | "internationalReasons"
  | "internationalBranches"
  | "internationalBasicInfo"
  | "applicationRequests"
  | "interviews"
  | "internationalPreReg"
  | "internationalApplicant"
  // my doctor
  | "mySurveys"
  | "allSurveys"
  | "surveyParticipants" // شرکت کنندگان
  | "surveyTestRequests" //  درخواست دهندگان
  | "surveyLabs" //  آزمایشگا ها
  //management
  | "allAuthUserLists"
  | "myAuthUserLists"
  | "studentsList"
  | "allAuthEmployeeList"
  | "myAuthEmployeeList"
  | "allAuthAdminList"
  | "myAuthAdminList"
  | "allAuthRoles"
  | "myAuthRoles"
  | "rolesList"
  | "allSajedRequests"
  | "mySajedRequests"
  | "allAuthStudentRequests"
  | "myAuthStudentRequests"
  | "inquiryUsers"
  | "roleRequest"
  | "allAuthInquiryUsers"
  | "myAuthInquiryUsers"
  | "allAuthStudentsList"
  | "myAuthStudentsList"
  | "allRoleRequest"
  | "myRoleRequest"
  | "authAllForeignUserRequest"
  | "authMyForeignUserRequest"
  //organize
  | "business"
  // wallet
  | "walletAllWithdrawRequests" //  درخواست های برداشت همه
  | "walletMyWithdrawsRequests" // درخواست های برداشت من
  | "walletBasicInformation" // اطلاعات پایه
  | "walletAllList" // کیف پول ها
  | "walletAllWalletDetail" //  کیف پول من
  | "walletMyWalletDetail" //  جزییات کیف پول من
  | "walletMyTranasctions" // تراکنش های من
  | "walletAllTransactions" // همه تراکنش ها
  | "walletAllBankTransaction" // تراکنش های بانکی
  | "walletBankRequests" // درخواست ها- درخواست های حساب
  // contracts
  | "contractContractsList" // لیست قراردادها
  | "contractTemplatesList" // لیست قالب ها
  | "contractAddTemplate" // افزودن قالب جدید
  | "contractBeneficiaryList" // ذینفعان
  | "contractSetting" // تنظیمات قرارداد
  // ticketing
  | "allTicketUserTickets" // تیکت های کاربران- همه تیکت های کاربران
  | "myTicketUserTickets" // تیکت های کاربران- تیکت کاربران من
  | "allTicketInternalTickets" // تیکت های داخلی- همه
  | "myTicketInternalTickets" // تیکت های داخلی- من
  | "myTicketAIResponse" // پاسخ های هوشمند - من
  | "myTicketBasicInformation" // اطلاعات پایه من
  // shop
  | "bookOrders" // لیست سفارشات همه
  | "bookProductsAll" // لیست کالا های همه
  | "bookProductRequests" // لیست درخواست های کالا های همه
  | "bookSellers" // لیست فروشندگان همه
  | "bookBaseInformationDeliverySetting" //لیست تنظیمات ارسال همه
  | "bookBaseInformationCategories" //لیست تنظیمات دسته بندی همه
  // catering
  | "foodV2AllRestaurants" // همه سلف ها
  | "foodV2MyRestaurants" // سلف های من
  | "foodV2AllVendors" // همه تامین کنندگان
  | "foodV2MyVendors" // تامین کنندگان من
  | "foodV2AllContracts" // همه قرارداد ها
  | "foodV2MyContracts" //  قرارداد های من
  | "foodV2AllContractRequests" //  همه درخواست های قرارداد
  | "foodV2MyContractRequests" //   درخواست های قرارداد من
  | "foodV2AllPlans" //  همه برنامه های غذایی
  | "foodV2MyPlans" //  برنامه های غذایی من
  | "foodV2AllOrders" // همه سفارشات
  | "foodV2MyOrders" //  سفارشات من
  | "foodV2AllCancelOrders" // همه لغو شده ها
  | "foodV2MyCancelOrders" // لغو شده های من
  | "foodV2AllOrderDelivery" // تحویل غذای همه
  | "foodV2MyOrderDelivery" // تحویل غذای من
  | "foodV2AllProducts" // همه غذا های اصلی
  | "foodV2MyProducts" // غذا های اصلی من
  | "foodV2AllSideProducts" // همه مخلفات
  | "foodV2MySideProducts" // مخلفات من
  | "foodV2BaseProducts" //  اطلاعات پایه غذاها
  | "foodV2BaseSideProducts" //  اطلاعات پایه مخلفات
  | "default";
