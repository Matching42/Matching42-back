/**
 * @swagger
 * /waitlist/{userId}:
 *  delete:
 *      description: 특정 user를 subject 랜덤 매칭 대기열에서 삭제하는 API입니다.
 *      parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 랜덤 매칭 대기를 취소할 user의 id입니다.
 *      responses:
 *          200:
 *              description: 특정 user를 subject 랜덤 매칭 대기열에서 성공적으로 삭제하였을 경우 다음 결과가 반환됩니다. <br><br>
 *                `User` 객체 - 해당 user객체의 waitMatching(매칭 대기중인 subject)을 null값으로 변경 <br>
 *                (ex. waitMatching값이 ft_printf였을 경우 null로 변경해 매칭 대기 취소)<br><br>
 *                `Waitlist` 객체 - Waitlist Document의 해당 subject객체의 `user`배열의 객체 중 'userID'값이 `parameters.userID`와 동일한 객체를 user배열에서 삭제합니다.<br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            User:
 *                              $ref: "#/components/schemas/User"
 *                            Waitlist:
 *                              $ref: "#/components/schemas/Waitlist"
 *          400:
 *              description: |
 *                오류가 발생해 특정 user를 subject 랜덤 매칭 대기열에서 삭제하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - 존재하지 않는 user_ID값이 들어온 경우 <br>
 *                - 해당 user_ID가 랜덤 매칭 대기중인 subject가 없는 경우 <br>
 *                - 존재하지 않는 subject_name값이 들어온 경우 <br>
 *                - 해당 subject 랜덤 매칭 대기열에 존재하지 않는 경우 <br>
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
 *                                 type: string
 *                          example:
 *                            success: false
 *                            error:
 *                              code: Error
 *                              message: This user_ID does not exist.
 */
