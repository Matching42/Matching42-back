/**
 * @swagger
 * /team:
 *  get:
 *      description: 요청시 모든 팀 데이터를 반환합니다. 쿼리값이 있을 시 특정 범위에 팀 데이터를 반환합니다.
 *      parameters:
 *      - in: query
 *        name: limit
 *        description: 한 페이지에 몇 개의 팀 데이터를 담을 것인지 나타내는 값입니다. 음수 입력시 빈 배열을 반환합니다.
 *        required: false
 *        schema:
 *           type: integer
 *           default: 5
 *           minimum: 1
 *      - in: query
 *        name: page
 *        description: 페이지 번호입니다. 음수 입력시 빈 배열을 반환합니다.
 *        required: false
 *        schema:
 *          type: integer
 *          default: 0
 *          minimum: 0
 *      - in: query
 *        name: progress
 *        description: 값을 true로 줄 경우, 팀원 부족에 상관 없이 현재 진행중인 팀들만 반환합니다. state가 end가 아닌 팀들만 반환됩니다.
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: subject
 *        description: 특정 subject를 값으로 줄 경우, 그와 일치하는 subject를 가진 팀만 반환됩니다.
 *        required: false
 *        schema:
 *          type: string
 *      responses:
 *          200:
 *              description: 팀 데이터 배열을 반환합니다. 팀 데이터 배열 범위 밖에 데이터를 요청했다면 빈 배열을 반환합니다. 범위는 [page * limit, page * limit + limit]입니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: "#/components/schemas/Team"
 *                      example:
 *                          success: true
 *                          data: []
 *          400:
 *              description: DB에 데이터 요청 도중 에러 발생시 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              error:
 *                                  properties:
 *                                      code:
 *                                          type: string
 *                                      message:
 *                                          type: string
 *                      example:
 *                          success: false
 *                          error:
 *                              code: 400
 *                              message: 400 error
 *          401:
 *              description: 허가받지 않은 사용자가 접근할시 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: bollean
 *                              message:
 *                                  type: string
 *                      example:
 *                          success: false
 *                          message: No authenticated user
 */

/**
 * @swagger
 *  /team/{teamID}:
 *      get:
 *          description: 특정 팀 데이터를 반환하는 API입니다.
 *          parameters:
 *          - in : path
 *            name: teamID
 *            required: true
 *            schema:
 *              type: string
 *              minimum: 1
 *              maximum: 1
 *            description: 찾고자 하는 팀의 ID입니다.
 *          responses:
 *              200:
 *                  description: teamID와 일치하는 데이터가 있을시 그 데이터를 반환합니다. teamID와 일치하는 데이터가 없을 때 data에 null을 넣어 반환합니다.
 *                  content:
 *                      applicaion/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: bollean
 *                                  data:
 *                                      $ref: "#components/schemas/Team"
 *                  example:
 *                      success: true
 *                      data:
 *                          memberID: []
 *                          _id: "132"
 *                          ID: "1"
 *                          leaderID: "snpark"
 *                          subject: "ft_printf"
 *                          state: "less_member"
 *                          startDate: "2021-05-19T15:00:00.000Z"
 *                          notionLink: "https://notion.so"
 *                          gitLink: "https://github.com"
 *                          teamName: "ft_printf#1"
 *              400:
 *                  description: DB에 데이터 요청 도중 에러 발생시 반환됩니다.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  error:
 *                                      properties:
 *                                          code:
 *                                              type: string
 *                                          message:
 *                                              type: string
 *                          example:
 *                              success: false
 *                              error:
 *                                  code: 400
 *                                  message: 400 error
 *              401:
 *                  description: 허가받지 않은 사용자가 접근할시 반환됩니다.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: bollean
 *                                  message:
 *                                      type: string
 *                          example:
 *                              success: false
 *                              message: No authenticated user
 */
