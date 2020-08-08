const express = require('express');
const { check, validationResult} = require("express-validator/check");
const router = express.Router();

/*----------------Controller Start--------------*/

const GymController = require('../controllers/gym.controller');

const MemberController = require('../controllers/member.controller');

const UserController = require('../controllers/user.controller');
const LoginController = require('../controllers/login.controller');

const PlanController = require('../controllers/plan.controller');

const TaxController = require('../controllers/tax.controller');

const EnrollmentFeeController = require('../controllers/enrollment_fee.controller');

const TrainerController = require('../controllers/trainer.controller');

const ComplaintController = require('../controllers/complaint.controller');

const BatchController = require('../controllers/batch.controller');

const GenderController = require('../controllers/gender.controller');

const VerifyToken = require('../controllers/verify_token');

/*----------------Controller End--------------*/

/*----------------Validation Start--------------*/

const MemberValidation = [ 
        check("name", "Please enter a name.").not().isEmpty(),
        check("email", "Please enter a email.").isEmail().withMessage('Please enter a valid email.'),
        check("phone", "Please enter a phone.").isNumeric().withMessage('Please enter a valid phone').isLength({min: 10, max: 15}).withMessage('must be at least 10 digit.'),
        check("gender_id","Please checked a gender.").not().isEmpty(),
        check("dob","Please enter a date of birth.").isDate(),
        check("address","Please enter a address.").not().isEmpty(),
        check("height","Please enter a height.").not().isEmpty(),
        check("photo","Please select photo.").not().isEmpty(),
		
        check("plan_details.plan_id","Please select plan.").not().isEmpty(),
        check("plan_details.plan_price","Please enter a plan price.").not().isEmpty(),
        check("plan_details.start_date","Please enter a start date.").not().isEmpty(),
        check("plan_details.end_date","Please enter a end date.").not().isEmpty(),
        check("plan_details.payment_method_id","Please select payment method.").not().isEmpty(),
        check("plan_details.paid_amount","Please enter paid amount.").not().isEmpty(),
        check("plan_details.enrollment_fee_id","Please select enrollment fee.").not().isEmpty(),
        check("plan_details.discount_type_id","Please select discount type.").not().isEmpty(),
		
		check("tax_applicable.tax_amount","Please enter a tax amount.").not().isEmpty(),
		check("tax_applicable.due_amount","Please enter a due amount.").not().isEmpty(),
		check("tax_applicable.due_amount_reminder","Please enter a due amount reminder.").not().isEmpty(),
		check("tax_applicable.batch_id","Please select batch.").not().isEmpty(),
		check("tax_applicable.bill_date","Please enter a bill date.").not().isEmpty(),
		
		check("other_details.document_file","Please select document file.").not().isEmpty(),
		check("other_details.dob","Please enter a date of birth.").isDate(),
		check("other_details.email", "Please enter a email.").isEmail().withMessage('Please enter a valid email.'),
		check("other_details.care_of","Please enter a care of.").not().isEmpty(),
		check("other_details.company_name","Please enter a company name.").not().isEmpty(),
		check("other_details.company_gst","Please enter a company gst.").not().isEmpty(),
		check("other_details.marriage_anniversary","Please enter a marriage anniversary.").isDate(),
		check("other_details.remark","Please enter a remark.").not().isEmpty()
    ]

const GymValidation = [
        check("organization_name", "Please enter a organization name.").not().isEmpty(),
        check("email", "Please enter a email.").isEmail().withMessage('Please enter a valid email.'),
        check("phone", "Please enter a phone.").isNumeric().withMessage('Please enter a valid phone').isLength({min: 10, max: 15}).withMessage('must be at least 10 digit.'),
        check("website","Please enter a website.").not().isEmpty(),
		check("country_id","Please select country.").not().isEmpty(),
        check("state_id","Please select state.").not().isEmpty(),
        check("city_id","Please select city.").not().isEmpty(),
        check("address","Please enter a address.").not().isEmpty(),
        check("owner_contact_no","Please enter a owner contact no.").isNumeric().withMessage('Please enter a valid phone').isLength({min: 10, max: 15}).withMessage('must be at least 10 digit.'),
        check("currency_id","Please enter a currency.").not().isEmpty(),
        check("gst_no","Please enter a gst no.").not().isEmpty(),
        check("auto_email_send","Please checked auto email send.").not().isEmpty(),
        check("terms_and_condition","Please checked terms and condition.").not().isEmpty(),
        check("photo","Please select photo.").not().isEmpty()
    ]
	
const TaxValidation = [
        check("gym_id", "Please enter a gym.").not().isEmpty(),
        check("tax", "Please enter a tax.").not().isEmpty(),
        check("percentage", "Please enter a percentage.").not().isEmpty()
    ]

const EnrollmentFeeValidation = [
		//check("gym_id", "Please enter a gym.").not().isEmpty(),
        check("fee", "Please enter a tax.").not().isEmpty()
    ]
	
const ComplaintValidation = [
		check("gym_id", "Please enter a gym.").not().isEmpty(),
        check("fee", "Please enter a tax.").not().isEmpty()
    ]
	
const BatchValidation = [
		//check("gym_id", "Please enter a gym.").not().isEmpty(),
        check("name", "Please enter a name.").not().isEmpty(),
        check("limit", "Please enter a limit.").not().isEmpty(),
        check("open_time", "Please enter a open time.").not().isEmpty(),
        check("close_time", "Please enter a close time.").not().isEmpty()
    ]
	
const TrainerValidation = [
		check("gym_id", "Please enter a gym.").not().isEmpty(),
        check("name", "Please enter a name.").not().isEmpty(),
        check("email", "Please enter a email.").isEmail().withMessage('Please enter a valid email.'),
        check("phone", "Please enter a phone.").isNumeric().withMessage('Please enter a valid phone').isLength({min: 10, max: 15}).withMessage('must be at least 10 digit.'),
        check("gender_id","Please checked a gender.").not().isEmpty(),
        check("dob","Please enter a date of birth.").isDate(),
        check("address","Please enter a address.").not().isEmpty(),
        check("experience","Please enter a experience.").not().isEmpty(),
        check("photo","Please enter a photo.").not().isEmpty()
    ]
/*----------------Validation End--------------*/


/*----------------Route Start--------------*/

router.post('/add-gym',GymValidation,VerifyToken,GymController.AddGym);
router.get('/gym/:id',VerifyToken,GymController.GetGym);
router.put('/gym',VerifyToken,GymController.EditGym);
router.delete('/gym',VerifyToken,GymController.DeleteGym);

router.post('/add-member',MemberValidation,VerifyToken,MemberController.AddMember);
router.get('/member/:id',VerifyToken,MemberController.GetMember);  
router.put('/member',VerifyToken,MemberController.EditMember);
router.delete('/member',VerifyToken,MemberController.DeleteMember);

router.post('/add-plan',VerifyToken,PlanController.AddPlan);
router.get('/plan/:id',VerifyToken,PlanController.GetPlan);
router.put('/plan/:id',VerifyToken,PlanController.EditPlan);
router.delete('/plan/:id',VerifyToken,PlanController.DeletePlan);

router.post('/add-tax',TaxValidation,VerifyToken,TaxController.AddTax);
router.get('/tax/:id',VerifyToken,TaxController.GetTax);
router.put('/tax',VerifyToken,TaxController.EditTax);
router.delete('/tax',VerifyToken,TaxController.DeleteTax);

router.post('/enrollment-fee',EnrollmentFeeValidation,VerifyToken,EnrollmentFeeController.AddEnrollmentFee);
router.get('/enrollment-fee/:id',VerifyToken,EnrollmentFeeController.GetEnrollmentFee);
router.put('/enrollment-fee',VerifyToken,EnrollmentFeeController.EditEnrollmentFee);
router.delete('/enrollment-fee',VerifyToken,EnrollmentFeeController.DeleteEnrollmentFee);

router.post('/complaint',ComplaintValidation,VerifyToken,ComplaintController.AddComplaint);
router.get('/complaint/:id',VerifyToken,ComplaintController.GetComplaint);
router.put('/complaint',VerifyToken,ComplaintController.EditComplaint);
router.delete('/complaint',VerifyToken,ComplaintController.DeleteComplaint);


router.post('/batch',BatchValidation,VerifyToken,BatchController.AddBatch);
router.get('/batch/:id',VerifyToken,BatchController.GetBatch);
router.put('/batch',VerifyToken,BatchController.EditBatch);
router.delete('/batch',VerifyToken,BatchController.DeleteBatch);


router.post('/add-trainer',TrainerValidation,VerifyToken,TrainerController.AddTrainer);
router.get('/trainer/:id',VerifyToken,TrainerController.GetTrainer);
router.put('/trainer',VerifyToken,TrainerController.EditTrainer);
router.delete('/trainer',VerifyToken,TrainerController.DeleteTrainer);

router.post('/register',[
        check("email", "Please enter a valid email").isEmail().exists(),
        check("password", "Please enter a valid password").isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
		check("phone", "Please enter a phone.").isNumeric().withMessage('Please enter a valid phone').isLength({min: 10, max: 15}).withMessage('must be at least 10 digit.')
    ], UserController.register);
router.post('/login',[
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ], LoginController.login);


router.post('/add-gender',[
	check("name", "Please enter a name").not().isEmpty()
],VerifyToken,GenderController.AddGender);

module.exports = router;


/*----------------Route End--------------*/