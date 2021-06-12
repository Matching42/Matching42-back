/**
 * @swagger
 * /waitlist:
 *  post:
 *      description: 특정 user를 subject 랜덤 매칭 대기열에 추가하는 API입니다.
 *      requestBody:
 *        required: true
 *        description: |
 *          ### 변경할 상태 정보입니다.</br>
 *          - user_ID - 매칭 대기할 user의 ID값입니다.</br>
 *          - subject_name - 매칭 대기할 subject의 이름입니다.</br>
 *          - gitid - user의 gitid입니다.</br>
 *          - cluster - 선호하는 클러스터입니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_ID:
 *                  type: string
 *                subject_name:
 *                  type: string
 *                gitid:
 *                  type: string
 *                cluster:
 *                  type: string
 *                  enum: [개포, 서초]
 *              example:
 *                "user_ID": "kwlee"
 *                "subject_name": "ft_printf"
 *                "gitid": "Lks9172"
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
 *                - 존재하지 않는 user_ID값이 들어온 경우 <br>
 *                - 해당 user_ID가 해당 subject 랜덤 매칭 대기열에 이미 추가되어있는 경우 <br>
 *                - 존재하지 않는 subject_name값이 들어온 경우 <br>
 *                - 존재하지 않는 gitid값이 들어온 경우 <br>
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
