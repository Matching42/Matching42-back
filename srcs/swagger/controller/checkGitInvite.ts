/**
 * @swagger
 * /github/user/{userID}:
 *  get:
 *      description: 팀의 깃 저장소에 유저가 초대되어있는지 확인하는 API입니다.
 *      parameters:
 *      - in: path
 *        name:  userID
 *        required: false
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 초대되어있는지 확인할 유저의 id 입니다.
 *      responses:
 *          200:
 *              description: 대상을 성공적으로 확인했을 경우 다음 결과가 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            exist:
 *                              type: boolean
 *          400:
 *              description: |
 *                오류가 발생해 성공적으로 확인하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            error:
 *                              properties:
 *                               code:
 *                                 type: string
 *                               message:
 *                                 properties:
 *                                   userID: string
 *                          example:
 *                            success: false
 *                            error:
 *                              code: "Error"
 *                              message: "Invalid TeamID"
 */
