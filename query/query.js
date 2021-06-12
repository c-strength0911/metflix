module.exports = {
  USER: {
    INSERT: `INSERT 
                INTO user(user_id, user_password, user_nickname, user_type) 
                VALUE(?,?,?,?)`,
    SELECT_BY_ID: `SELCET * 
                      FROM user 
                      WHERE user_id=? 
                  AND user_password=?`,
  },
  FILE: {
    INSERT: `INSERT
  INTO file(file_ext, file_url, file_type, file_status)
  VALUES(?,?,?,?)`,
  },
};
