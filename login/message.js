/* eslint-disable prettier/prettier */
const customMessages = {
  custom_message: { code: 200, message: 'custom message' },
  user_create_success: {
    code: 200,
    message: 'Congratulations!! You have been registered successfully.',
  },
  login_otp_success: {
    code: 205,
    message: 'Verification OTP sent to your registered mobile number.',
  },
  already_exists_email: {
    code: 409,
    message: 'User already exists with email id',
  },
  already_exists_mobile: {
    code: 409,
    message: 'User already exists with mobile number',
  },
  already_exists_facebook: {
    code: 409,
    message: 'User already exists with facebook account',
  },
  already_exists_google: {
    code: 409,
    message: 'User already exists with google account',
  },
  already_exists_apple: {
    code: 409,
    message: 'User already exists with apple account',
  },
  already_exists_username: {
    code: 409,
    message: 'This username is already taken try another.',
  },
  user_not_found: {
    code: 404,
    message:
      "Sorry, we didn't find any account with that Email id/Mobile number",
  },
  user_blocked: {
    code: 419,
    message: 'Your account is blocked please contact to the support',
  },
  user_deleted: {
    code: 419,
    message: 'Your account is deleted please contact to the support',
  },
  verified_mobile_change: {
    code: 409,
    message: 'You can not change mobile number, please contact support',
  },
  verified_address_change: {
    code: 409,
    message: 'You can not change address details, please contact support',
  },
  verified_email_change: {
    code: 409,
    message: 'You can not change email, please contact support',
  },
  disposable_mail_fault: {
    code: 403,
    message:
      'Please sign up with valid email. Disposable mails are not allowed',
  },
  kyc_not_updated: {
    code: 419,
    message: 'Please update your kyc details first',
  },
  kyc_not_approved: {
    code: 419,
    message: 'Please wait for your KYC to be approved',
  },
  kyc_rejected: {
    code: 419,
    message: 'Your KYC is rejected please contact support',
  },
  duplicate_bank: { code: 419, message: 'Bank number already exist' },
  duplicate_panCard: { code: 419, message: 'PAN number already exist' },
  kyc_remove_old: { code: 419, message: 'Remove old KYC first' },
  insufficient_chips: { code: 419, message: 'You have insufficient balance' },
  max_withdraw_request: {
    code: 419,
    message: 'You have reached maximum withdraw request for a day.',
  },
  max_table_join_limit: {
    code: 419,
    message: 'You can not join more than 3 tables',
  }, // for table
  max_table_join_limit_tournament: {
    code: 420,
    message: 'You can not join more than 3 tables',
  }, // for tournament
  table_proto_not_found: {
    code: 404,
    message: `Couldn't find the table. Please try after sometime`,
  },
  rummy_insufficient_chips: { code: 419, message: 'Insufficient Rummy chips' },
  rummy_not_enough_cards: { code: 419, message: 'Not enough cards' },
  invalid_ifsc_code: { code: 419, message: 'Please enter valid IFSC code' },
  invalid_account_number: {
    code: 419,
    message: 'Please enter valid Account Number',
  },
  invalid_pan_number: {
    code: 419,
    message: 'Please enter valid Pancard number',
  },
  invalid_password: {
    code: 419,
    message: 'Please enter valid password with length 8 to 15.',
  },
  duplicate_password: {
    code: 419,
    message: 'You can not use old password as your new password',
  },
  username_update_err: {
    code: 419,
    message: 'You can not update your user name more than one time.',
  },
  bank_not_updated: {
    code: 419,
    message: 'Please update your Bank details first',
  },
  not_allowed_region: {
    code: 400,
    message: 'This game is restricted in your region.',
  },
  invalid_social_acc: { code: 419, message: 'Invalid social account.' },
  private_table_notAllowed: {
    code: 419,
    message: 'Please wait until your previous table get finished.',
  },
  private_table_disabled: {
    code: 419,
    message: 'Private table option is disabled.',
  },
  private_table_part: {
    code: 419,
    message: `You are already part of this game please join from 'My Joined Game' tab.`,
  },
  support_404_stateChange: {
    code: 419,
    message: `Ticket not found or state is not valid for remove`,
  },
  unable_withdraw: {
    code: 406,
    message: `You can not withdraw after registration time ends.`,
  },
  own_agent_id: {
    code: 406,
    message: `You can not Register with your own agent id.`,
  },

  /** socket errors */
  already_grabbed_card: { code: 419, message: 'Already grabbed card' },
  no_card_to_grab: { code: 419, message: 'No card to grab' },
  no_card_to_layoff: { code: 419, message: 'No card to layoff' },
  can_not_grab_joker: { code: 419, message: 'Can not grab joker' },
  invalid_hand_length: { code: 419, message: 'Invalid hands length > 14' },
  already_created_max_groups: {
    code: 419,
    message: 'Already created maximum groups.',
  },
  card_not_exists: { code: 419, message: 'Card does not exists' },
  wait_for_turn: { code: 419, message: 'Please wait for your turn.' },
  can_not_drop_discard_first: {
    code: 419,
    message: 'You can not drop. Discard your card first',
  },
  can_not_declare: { code: 419, message: 'can not declare invalid state' },
  email_required_validation: { code: 419, message: 'Please update your email address first.' },
  invalid_referral_code: { code: 406, message: "invalid referral code" }
};
/**
 * Push notification messages
 */
const notifications = {};

const builder = {
  wrong_credentials: (prefix) =>
    builder.prepare(403, prefix, 'Invalid credentials.'),
  unauthorized: (prefix) =>
    builder.prepare(
      401,
      prefix,
      'Authentication Error, Please try logging again.',
    ),
  invalid_req: (prefix) => builder.prepare(406, prefix, 'invalid Request.'),
  wrong_otp: (prefix) =>
    builder.prepare(403, prefix, 'entered OTP is invalid.'),
  wrong_password: (prefix) =>
    builder.prepare(
      403,
      prefix,
      'The current password you entered was incorrect.',
    ),
  server_error: (prefix) => builder.prepare(500, prefix, 'server error.'),
  server_maintenance: (prefix) =>
    builder.prepare(500, prefix, 'maintenance mode is active.'),
  inactive: (prefix) => builder.prepare(403, prefix, 'inactive.'),
  not_found: (prefix) => builder.prepare(404, prefix, 'not found.'),
  not_matched: (prefix) => builder.prepare(406, prefix, 'not matched.'),
  not_verified: (prefix) => builder.prepare(406, prefix, 'not verified.'),
  already_exists: (prefix) => builder.prepare(409, prefix, 'already exists.'),
  user_deleted: (prefix) => builder.prepare(406, prefix, 'deleted by admin.'),
  user_blocked: (prefix) => builder.prepare(406, prefix, 'blocked by admin.'),
  required_field: (prefix) => builder.prepare(419, prefix, 'field required.'),
  too_many_request: (prefix) =>
    builder.prepare(429, prefix, 'too many request.'),
  expired: (prefix) => builder.prepare(417, prefix, 'expired.'),
  canceled: (prefix) => builder.prepare(419, prefix, 'canceled.'),
  created: (prefix) => builder.prepare(200, prefix, 'created.'),
  updated: (prefix) => builder.prepare(200, prefix, 'updated.'),
  deleted: (prefix) => builder.prepare(417, prefix, 'deleted.'),
  blocked: (prefix) => builder.prepare(401, prefix, 'blocked.'),
  success: (prefix) => builder.prepare(200, prefix, 'success.'),
  delete_success: (prefix) =>
    builder.prepare(200, prefix, 'deleted successfully.'),
  delink_success: (prefix) =>
    builder.prepare(200, prefix, 'account delinked successfully.'),
  successfully: (prefix) => builder.prepare(200, prefix, 'successfully.'),
  error: (prefix) => builder.prepare(500, prefix, 'error.'),
  no_prefix: (prefix) => builder.prepare(200, prefix, ''),
  custom: { ...customMessages },
  getString: (key) => (customMessages ? customMessages[key].message : ''),
  match_minimum_crteria: (prefix) =>
    builder.prepare(419, prefix, 'is minimum criteria.'),
  match_maximum_crteria: (prefix) =>
    builder.prepare(419, prefix, 'is maximum criteria.'),
  not_allowed: (prefix) => builder.prepare(409, prefix, 'not allowed.'),
  // custom: key => builder.prepare(...customMessages[key], ''),
  notifications,
  // socket response
  grab_card_error_table: (prefix) =>
    builder.prepare(419, prefix, 'can not grab Card while table - '),
  grab_card_error_participant: (prefix) =>
    builder.prepare(419, prefix, 'can not grab Card while participant - '),
  discard_card_error_table: (prefix) =>
    builder.prepare(419, prefix, 'can not discard card while table -'),
  group_card_error_table: (prefix) =>
    builder.prepare(419, prefix, 'can not group hand while table - '),
  group_card_error_participant: (prefix) =>
    builder.prepare(419, prefix, 'can not group hand while participant '),
  sort_hand_error: (prefix) =>
    builder.prepare(419, prefix, 'can not sort hand -'),
  drop_error_table: (prefix) =>
    builder.prepare(419, prefix, 'can drop while table -'),
  drop_error_participant: (prefix) =>
    builder.prepare(419, prefix, 'can drop while table -'),
};

Object.defineProperty(builder, 'prepare', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: (code, prefix, message) => ({
    code,
    message: `${prefix ? `${prefix} ${message}` : message}`,
  }),
});

module.exports = builder;
