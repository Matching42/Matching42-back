/**
 * @swagger
 * /waitlist:
 *  post:
 *      description: 특정 user를 subject 랜덤 매칭 대기열에 추가하는 API입니다.
 *      requestBody:
 *        required: true
 *        description: |
 *          ### 변경할 상태 정보입니다.</br>
 *          - userID - 매칭 대기할 user의 ID값입니다.</br>
 *          - subjectName - 매칭 대기할 subject의 이름입니다.</br>
 *          - gitName - user의 github username입니다.</br>
 *          - cluster - 선호하는 클러스터입니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userID:
 *                  type: string
 *                subjectName:
 *                  type: string
 *                gitName:
 *                  type: string
 *                cluster:
 *                  type: string
 *                  enum: [개포, 서초]
 *              example:
 *                "userID": "kwlee"
 *                "subjectName": "ft_printf"
 *                "gitName": "Lks9172"
 *                "cluster": "개포"
 *      responses:
 *          200:
 *              description: 특정 user를 subject 랜덤 매칭 대기열에 성공적으로 추가하였을 경우 다음 결과가 반환됩니다.
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
 *                오류가 발생해 특정 user를 subject 랜덤 매칭 대기열에 추가하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - 존재하지 않는 userID가 들어온 경우 <br>
 *                - 해당 userID가 해당 subject 랜덤 매칭 대기열에 이미 추가되어있는 경우 <br>
 *                - 존재하지 않는 subjectName값이 들어온 경우 <br>
 *                - 존재하지 않는 gitName값이 들어온 경우 <br>
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
 *                              message: This userID does not exist.
 */
