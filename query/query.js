module.exports = {
  USER: {
    INSERT: `INSERT 
                INTO user(user_id, user_password, user_nickname, user_type) 
                VALUE(?,?,?,?)`,
    SELECT_BY_ID: `SELECT * 
                      FROM user 
                      WHERE user_id=?
                  AND user_password=?`,
    PROFILE: `SELECT user_profile_file_no, user_id, user_nickname FROM user AS u JOIN file AS f ON u.user_profile_file_no = f.file_no`,
  },
  FILE: {
    INSERT: `INSERT
  INTO file(file_ext, file_url, file_type, file_status)
  VALUES(?,?,?,?)`,
  },
};
