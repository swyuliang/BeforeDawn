using UnityEngine;
using System.Collections;
//本脚本是根据Unity所提供的第一人称控制器中的CharacterMotor。js脚本改编的，添加了一些原来脚本中所没有的功能
//其中custom code部分的代码是额外添加的代码

[RequireComponent(typeof(CharacterController))]//此脚本所挂载的游戏对象上需有角色控制器组件
public class PlayerController : MonoBehaviour {
	public bool canControl = true;//角色是否处于可控状态
	public bool useFixedUpdate = true;//是否使用FixedUpdate方法，如果涉及到物理计算建议使用FixedUpdate
	
	#region custom code
	[HideInInspector]//在检视视图中隐藏变量，即不显示公共变量
	public bool running;//处于跑动状态标志位
	[HideInInspector]
	public bool walking;//处于走动状态标志位
	[HideInInspector]
	public bool canRun;//是否能够跑动标志位
	
	private GameObject mainCamera = null;//定义主摄像机对象
	
	[HideInInspector]
	public bool onLadder = false;//是否处于梯子上
	private float ladderHopSpeed = 6.0f;//爬梯速度
	#endregion
	
	[System.NonSerialized]//告诉Unity不要序列化该变量，并在检视视图中不显示该变量
	public Vector3 inputMoveDirection = Vector3.zero;//角色移动方向变量
	
	[System.NonSerialized]
	public bool inputJump = false;//是否起跳标志位
	
	#region custom code
	[System.NonSerialized]
	public bool inputRun = false;//是否加速跑动标志位
	
	[System.NonSerialized]
	public bool inputCrouch = false;//是否下蹲标志位
	#endregion
	
	[System.Serializable]//将类序列化后，该类类型的变量便可在Inspector视图中显示了
	public class PlayerControllerMovement {
		[HideInInspector]//在Inspector视图中隐藏变量
		public float maxForwardSpeed = 10.0f;//最大向前速度
		[HideInInspector]
		public float maxSidewaysSpeed = 10.0f;//最大侧向速度
		[HideInInspector]
		public float maxBackwardsSpeed = 10.0f;//最大后退速度
		
		#region custom code
		public float walkSpeed = 6.0f;//行走速度
		public float runSpeed = 9.0f;//跑动速度
		
		public bool canCrouch = true;//是否可以下蹲标志位
		public float crouchSpeed = 3.0f;//下蹲速度
		public float crouchHeight = 1.2f;//下蹲时的高度
		public float crouchSmooth = 0.1f;//下蹲时的平滑
		#endregion
		
		//创建动画曲线，用来控制角色在斜坡上的速度
		public AnimationCurve slopeSpeedMultiplier = new AnimationCurve(new Keyframe(-90, 1), new Keyframe(0, 1), new Keyframe(90, 0));
		
		public float maxGroundAcceleration = 30.0f;//最大地面加速度
		public float maxAirAcceleration = 20.0f;//最大空中加速度
		
		public float gravity = 10.0f;//重力加速度
		public float maxFallSpeed = 20.0f;//最大下落速度
	
		[HideInInspector]
		public bool enableGravity = true;//使用重力加速度标志位

		[System.NonSerialized]
		public CollisionFlags collisionFlags;//定义碰撞标志位

		[System.NonSerialized]
		public Vector3 velocity;//追踪角色的当前速度

		[System.NonSerialized]
		public Vector3 frameVelocity = Vector3.zero;//追踪没有落地时的角色速度
	
		[System.NonSerialized]
		public Vector3 hitPoint = Vector3.zero;//射线碰撞点
	
		[System.NonSerialized]
		public Vector3 lastHitPoint = new Vector3(Mathf.Infinity, 0, 0);//上一次碰撞点
	}
	
	public PlayerControllerMovement movement = new PlayerControllerMovement();//创建一个实例
	
	#region custom code
	[HideInInspector]
	public bool crouch;//下蹲标志位
	private float standardHeight;//标准高度
	private GameObject lookObj;//看向的物体，保证视角的正确
	private float centerY;//竖直方向中心点
	private bool canStand;//能否站起判断变量
	private bool canStandCrouch = true;//能否站起下蹲判断变量
	#endregion

	public enum PlayerMovementTransferOnJump {
		None, //起跳不受在地面上的速度的影响
		InitTransfer, //起跳后的速度与地面上的速度相同，然后逐渐减小到停止
		PermaTransfer, //起跳后的速度与地面上的速度相同，并且保持速度直到落地
		PermaLocked //相对于上一次运动的落地点跳起，将随着地面一起移动
	}
	
	[System.Serializable]
	public class PlayerControllerJumping {
		public bool enabled = true;//是否启用跳起动作
	
		public float baseHeight = 1.0f;//按下起跳键并让其立即起跳时的基础高度
		
		public float extraHeight = 4.1f;//当起跳时长时间按住起跳键时跳起的额外高度
		
		public float perpAmount = 0.0f;//角色急速起跳所跳过所站表面的高度
		
		public float steepPerpAmount = 0.5f;//角色急速起跳所跳过所站陡峭表面的高度
		
		[System.NonSerialized]
		public bool jumping = false;//是否起跳标志位，当在空中时是否仍然起跳
		
		[System.NonSerialized]
		public bool holdingJumpButton = false;//是否按住起跳键标志位
	
		[System.NonSerialized]
		public float lastStartTime = 0.0f;//上次开始的时间，用于计时按住起跳键的时间
		
		[System.NonSerialized]
		public float lastButtonDownTime = -100;//上次按下按钮的时间
		
		[System.NonSerialized]
		public Vector3 jumpDir = Vector3.up;//跳起方向
	}
	
	public PlayerControllerJumping jumping = new PlayerControllerJumping();//创建跳起变量实例
	
	[System.Serializable]
	public class PlayerControllerMovingPlatform {
		public bool enabled = true;//是否启用移动动作
		
		public PlayerMovementTransferOnJump movementTransfer = PlayerMovementTransferOnJump.PermaTransfer;//移动模式
		
		[System.NonSerialized]
		public Transform hitPlatform;//碰撞平台
		
		[System.NonSerialized]
		public Transform activePlatform;//活动平台
		
		[System.NonSerialized]
		public Vector3 activeLocalPoint;//激活的本地点
		
		[System.NonSerialized]
		public Vector3 activeGlobalPoint;//激活的全局点
		
		[System.NonSerialized]
		public Quaternion activeLocalRotation;//激活的本地旋转
		
		[System.NonSerialized]
		public Quaternion activeGlobalRotation;//激活的全局旋转
		
		[System.NonSerialized]
		public Matrix4x4 lastMatrix;//上一矩阵
		
		[System.NonSerialized]
		public Vector3 platformVelocity;//平台速度
		
		[System.NonSerialized]
		public bool newPlatform;//是否为新的平台标志位
	}

	public PlayerControllerMovingPlatform movingPlatform = new PlayerControllerMovingPlatform();//实例化对象
	
	[System.Serializable]
	public class PlayerControllerSliding {
		public bool enabled = true;//是否角色在一个陡峭的表面滑动
		
		public float slidingSpeed = 15;//在斜面上的滑动速度
		
		public float sidewaysControl = 1.0f;//玩家能够控制的滑动方向的多少，当为0.5时表示玩家可以半速侧滑
		
		public float speedControl = 0.4f;//控制速度，下坡时速度增加，上坡时速度减小
	}

	public PlayerControllerSliding sliding = new PlayerControllerSliding();//实例化对象
	
	#region custom code
	[System.Serializable]
	public class PlayerControllerPushing {	
		public bool canPush = true;//是否可推动刚体标志位
		public float pushPower = 2.0f;//推动的力量
	}
	public PlayerControllerPushing pushing;//声明变量
	#endregion
		
	[System.NonSerialized]
	public bool grounded = true;//角色是否落地标志位
	
	[System.NonSerialized]
	public Vector3 groundNormal = Vector3.zero;//地面法向量
	
	private Vector3 lastGroundNormal = Vector3.zero;//上次落地法向量

	private Transform tr;//声明变量
	
	private CharacterController controller;//声明角色控制器变量
	
	void Awake () {
		controller = GetComponent<CharacterController>();//得到角色控制器组件
		tr = transform;//赋值
		#region custom code
		standardHeight = controller.height;//得到角色标准身高
		lookObj = GameObject.FindWithTag("LookObject");//得到游戏对象
		centerY = controller.center.y;//得到角色竖直方向上的中心点
		mainCamera = GameObject.FindWithTag("MainCamera");//拿到主摄像机对象
		canRun = true;//赋值
		canStand = true;//赋值
		#endregion
	}
	
	private void UpdateFunction() {
		Vector3 velocity = movement.velocity;//将实际的速度赋值给一个临时的速度变量

		velocity = ApplyInputVelocityChange(velocity);//根据玩家的输入情况更新变量值
	
		if(movement.enableGravity){//当启用重力时
			if(crouch && inputJump)//下蹲过程中，玩家按起跳键不起作用
				return;
			velocity = ApplyGravityAndJumping (velocity);//应用重力并起跳，跳起是给一个Y方向向上的初速度，同时给一个重力加速度，实现上抛，更新速度
		}
		
		Vector3 moveDistance = Vector3.zero;//移动位移
		if (MoveWithPlatform()) {//当在平台上移动时
			Vector3 newGlobalPoint = movingPlatform.activePlatform.TransformPoint(movingPlatform.activeLocalPoint);//得到新的全局点
			moveDistance = (newGlobalPoint - movingPlatform.activeGlobalPoint);//计算移动位移
			if (moveDistance != Vector3.zero)//如果移动位移不为零时
				controller.Move(moveDistance);//移动角色
			
	        Quaternion newGlobalRotation = movingPlatform.activePlatform.rotation * movingPlatform.activeLocalRotation;//得到新的全局旋转
	        Quaternion rotationDiff = newGlobalRotation * Quaternion.Inverse(movingPlatform.activeGlobalRotation);//计算旋转四元数
	        
	        float yRotation = rotationDiff.eulerAngles.y;//得到角色在Y轴方向上的旋转角度
	        if (yRotation != 0) {//当Y方向上的旋转角度不为零时
		        tr.Rotate(0, yRotation, 0);//转动角色
	        }
		}

		Vector3 lastPosition = tr.position;//保存上一个位置用于速度计算

		Vector3 currentMovementOffset = velocity * Time.deltaTime;//计算当前移动偏移量
	
		float pushDownOffset = Mathf.Max(controller.stepOffset, new Vector3(currentMovementOffset.x, 0, currentMovementOffset.z).magnitude);//获得较大值
		if (grounded)//如果落地
			currentMovementOffset -= pushDownOffset * Vector3.up;//计算当前移动偏移量
	
		movingPlatform.hitPlatform = null;//重置变量
		groundNormal = Vector3.zero;//重置变量
	
		movement.collisionFlags = controller.Move (currentMovementOffset);//移动角色
	
		movement.lastHitPoint = movement.hitPoint;//赋值
		lastGroundNormal = groundNormal;//赋值
	
		if (movingPlatform.enabled && movingPlatform.activePlatform != movingPlatform.hitPlatform) {//当移动平台启用且活动平台不是接触到的平台时
			if (movingPlatform.hitPlatform != null) {//如果接触到的平台存在时
				movingPlatform.activePlatform = movingPlatform.hitPlatform;//将活动平台设置为接触到的平台
				movingPlatform.lastMatrix = movingPlatform.hitPlatform.localToWorldMatrix;//将接触到的平台的本地坐标系到世界坐标系的矩阵赋值给lastMatrix变量
				movingPlatform.newPlatform = true;//设置标志位为真
			}
		}
		
		Vector3 oldHVelocity = new Vector3(velocity.x, 0, velocity.z);//记录上一次水平方向速度
		movement.velocity = (tr.position - lastPosition) / Time.deltaTime;//计算移动速度
		Vector3 newHVelocity = new Vector3(movement.velocity.x, 0, movement.velocity.z);//记录新的水平方向速度
		
		if (oldHVelocity == Vector3.zero) {//当上一次记录的速度为零时
			movement.velocity = new Vector3(0, movement.velocity.y, 0);//重新赋值
		}
		else {
			float projectedNewVelocity = Vector3.Dot(newHVelocity, oldHVelocity) / oldHVelocity.sqrMagnitude;//计算新速度水平速度在上一次水平速度方向上的投影
			movement.velocity = oldHVelocity * Mathf.Clamp01(projectedNewVelocity) + movement.velocity.y * Vector3.up;//重新计算速度
		}
	
		if (movement.velocity.y < velocity.y - 0.001f) {//当竖直方向速度小于某个值时
			if (movement.velocity.y < 0) {//如果竖直方向速度小于零时
				movement.velocity.y = velocity.y;//赋值
			}
			else {
				jumping.holdingJumpButton = false;//禁用起跳按钮
			}
		}
	
		if (grounded && !IsGroundedTest()) {//当角色落地但是丢失落地面时，即处于下落过程中
			grounded = false;//设置落地为假
		
			if (movingPlatform.enabled &&
				(movingPlatform.movementTransfer == PlayerMovementTransferOnJump.InitTransfer ||
				movingPlatform.movementTransfer == PlayerMovementTransferOnJump.PermaTransfer)
			) {//当满足条件时
				movement.frameVelocity = movingPlatform.platformVelocity;//赋值
				movement.velocity += movingPlatform.platformVelocity;//计算移动速度
			}
			
			SendMessage("OnFall", SendMessageOptions.DontRequireReceiver);//调用OnFall方法
			tr.position += pushDownOffset * Vector3.up;//计算角色位置
		}
		else if (!grounded && IsGroundedTest()) {//当角色没有落地，但是站在某个东西上面
			grounded = true;//设置标志位为落地
			jumping.jumping = false;//设置起跳标志位为假，即站在某个物体上不算跳起
			SubtractNewPlatformVelocity();//调用方法
			
			SendMessage("OnLand", SendMessageOptions.DontRequireReceiver);//给OnLand方法发送消息
		}
	
		if (MoveWithPlatform()) {//当移动在平台上 
			movingPlatform.activeGlobalPoint = tr.position + Vector3.up * (controller.center.y - controller.height*0.5f + controller.radius);//计算移动平台的活动全局点
			movingPlatform.activeLocalPoint = movingPlatform.activePlatform.InverseTransformPoint(movingPlatform.activeGlobalPoint);//计算移动平台的活动自身点
			
	        movingPlatform.activeGlobalRotation = tr.rotation;//赋值
	        movingPlatform.activeLocalRotation = Quaternion.Inverse(movingPlatform.activePlatform.rotation) * movingPlatform.activeGlobalRotation; //计算移动平台活动的自身姿态
		}
	}
	
	void FixedUpdate() {
		if (movingPlatform.enabled) {//当启用移动平台时
			if (movingPlatform.activePlatform != null) {//当活动平台存在时
				if (!movingPlatform.newPlatform) {//当移动平台不是新平台时
					Vector3 lastVelocity = movingPlatform.platformVelocity;//赋值
					
					movingPlatform.platformVelocity = (
						movingPlatform.activePlatform.localToWorldMatrix.MultiplyPoint3x4(movingPlatform.activeLocalPoint)
						- movingPlatform.lastMatrix.MultiplyPoint3x4(movingPlatform.activeLocalPoint)
					) / Time.deltaTime;//计算移动平台上的速度
				}
				movingPlatform.lastMatrix = movingPlatform.activePlatform.localToWorldMatrix;//将活动平台的本地坐标系到世界坐标系的矩阵赋值给lastMatrix变量
				movingPlatform.newPlatform = false;//设置标志位为假
			}
			else {
				movingPlatform.platformVelocity = Vector3.zero;	//赋值
			}
		}
		
		if(useFixedUpdate) {//当启用FixedUpdate方法时
			UpdateFunction();//调用方法
		}
	}
	
	void Update () {
		if(!useFixedUpdate) {//当没有启用FixedUpdate方法时
			UpdateFunction();//调用方法
		}
		
		#region custom code
		if(Input.GetAxis("Vertical") > 0.1f && inputRun && canRun && walking){//当满足这些条件时
			if(canStand && canStandCrouch){//允许站立且允许下蹲时
				OnRunning();//调用跑动方法
			}
		}else{
			OffRunning();//调用禁止跑动方法
		}	
			
		if ((movement.velocity.x > 0.01f || movement.velocity.z > 0.01f) || (movement.velocity.x < -0.01f || movement.velocity.z < -0.01f)) {//当满足这些条件时
			walking = true;//走动标志位为真
		}else{
			walking = false;//走动标志位设为假
		}
		
		if(!canControl)//如果角色不可控,则不执行后面的代码
			return;
		
		if(movement.canCrouch){//当允许下蹲时
			if(!onLadder){//当角色没有爬梯时
				Crouch();//调用下蹲方法
			}
		}
		
		if(onLadder){//当在爬梯时
			grounded = false;//设置落地标志位假
			crouch = false;//设置下蹲标志为假
		}
		
		if(!crouch && controller.height < standardHeight-0.01f){//当没有下蹲且角色控制器高度小于角色标准高度0.01时
			controller.height = Mathf.Lerp(controller.height, standardHeight, Time.deltaTime/movement.crouchSmooth);//对角色控制器的高度线性插值，使角色控制器平滑到标准高度
			
			Vector3 tempCenter = controller.center;//不能直接用controller.center。y = 0.5f;这种做法是错误的，必须使用临时变量来对controller.center等类型的属性进行赋值
			tempCenter.y = Mathf.Lerp(tempCenter.y, centerY, Time.deltaTime/movement.crouchSmooth);//对角色控制器的中心点Y坐标线性插值
			controller.center = tempCenter;//赋值
			
			Vector3 tempPos = lookObj.transform.localPosition;//同上
			tempPos.y = Mathf.Lerp(tempPos.y, standardHeight, Time.deltaTime/movement.crouchSmooth);//对摄像机坐标线性插值，使摄像机随着角色高度的变换上下移动
			lookObj.transform.localPosition = tempPos;//赋值
		}
		#endregion
	}
	
	#region custom code
	void Crouch(){
		Vector3 up = transform.TransformDirection(Vector3.up);//得到角色的Y方向向量
	   	RaycastHit hit;//射线碰撞引用
		CharacterController charCtrl = GetComponent<CharacterController>();//得到角色控制器组件
	    Vector3 p1 = transform.position;//保存角色位置
		if(inputCrouch && !running && canStand){//当按下C键且角色不处于跑动状态，同时允许站立时，即只有站立状态时按下C键才起作用
			crouch = !crouch;//将标志位置反
		}

	   	 if (!Physics.SphereCast (p1, charCtrl.radius, transform.up, out hit, standardHeight)) {//球形碰撞检测
			if(inputJump && crouch){//当起跳时不允许下蹲
				crouch = false;//设置标志位
			}
			if(running && crouch){//当跑动时不允许下蹲
				crouch = false;//设置标志位
			}
			if(crouch){//当下蹲标志位为真时下蹲
				canStand = true;//设置标志位
			}
			canStandCrouch = true;//设置标志位
	   	}else{
	   		if(crouch){//当下蹲标志位为真时
	   			canStand = false;//设置标志位
	   		}
	   		canStandCrouch = false;//设置标志位
	   	}
		
		if(crouch){//如果下蹲标志位为真
			if(controller.height < movement.crouchHeight+0.01f && controller.height > movement.crouchHeight-0.01f)//如果这些满足条件
				return;//返回
			controller.height = Mathf.Lerp(controller.height, movement.crouchHeight, Time.deltaTime/movement.crouchSmooth);//使用线性插值改变角色控制器高度
			
			Vector3 tempCenterY = controller.center;//得到角色控制器中心点
			tempCenterY.y = Mathf.Lerp(tempCenterY.y, movement.crouchHeight/2, Time.deltaTime/movement.crouchSmooth);//线性插值改变角色控制器中心点位置
			controller.center = tempCenterY;//赋值
				
			Vector3 tempPos = lookObj.transform.localPosition;//得到lookObj对象的位置
			tempPos.y = Mathf.Lerp(tempPos.y, movement.crouchHeight, Time.deltaTime/movement.crouchSmooth);//线性插值改变位置
			lookObj.transform.localPosition = tempPos;//赋值
				
			movement.maxForwardSpeed = movement.crouchSpeed;//赋值
			movement.maxSidewaysSpeed = movement.crouchSpeed;//赋值
			movement.maxBackwardsSpeed = movement.crouchSpeed;//赋值
		}
	}
	
	void OnRunning (){
		running = true;//设置跑动标志位为真
		movement.maxForwardSpeed = movement.runSpeed;//给最大前进速度赋值
		movement.maxSidewaysSpeed = movement.runSpeed;//给侧向最大速度赋值
		jumping.extraHeight = jumping.baseHeight + 0.15f;//赋值
	}
	
	void OffRunning (){
		running = false;//设置跑动标志位为假
		if(crouch) { return; }//如果下蹲时不执行后续代码
			
		movement.maxForwardSpeed = movement.walkSpeed;//给最大前进速度赋值
		movement.maxSidewaysSpeed = movement.walkSpeed;//给侧向最大速度赋值
		movement.maxBackwardsSpeed = movement.walkSpeed/2;//给后退最大速度赋值
		jumping.extraHeight = jumping.baseHeight;//赋值，当角色走动时，跳起的额外高度为跳起的默认高度
	}
	#endregion
	
	private Vector3 ApplyInputVelocityChange(Vector3 velocity) {
		if(!canControl) {//如果不可控
			inputMoveDirection = Vector3.zero;//强制移动方向的向量为零向量
		}
		
		Vector3 desiredVelocity;//定义理想速度变量
		if(grounded && TooSteep()) {//当角色落地且在陡坡上
			//实例化滑行速度
			desiredVelocity = new Vector3(groundNormal.x, 0, groundNormal.z).normalized;
			//计算移动方向在滑行方向上的投影
			Vector3 projectedMoveDir = Vector3.Project(inputMoveDirection, desiredVelocity);
			desiredVelocity = desiredVelocity + projectedMoveDir * sliding.speedControl + (inputMoveDirection - projectedMoveDir) * sliding.sidewaysControl;//计算理想速度
			desiredVelocity *= sliding.slidingSpeed;//计算理想速度
		}
		else {
			desiredVelocity = GetDesiredHorizontalVelocity();//得到水平方向上的速度
		}

		if (movingPlatform.enabled && movingPlatform.movementTransfer == PlayerMovementTransferOnJump.PermaTransfer) {//满足条件时
			desiredVelocity += movement.frameVelocity;//计算理想速度
			desiredVelocity.y = 0;//赋值
		}
		
		if (grounded) {//如果落地
			desiredVelocity = AdjustGroundVelocityToNormal(desiredVelocity, groundNormal);//调用方法计算理想速度
		}
		else {
			velocity.y = 0;//赋值
		}
		
		float maxVelocityChange = GetMaxAcceleration(grounded) * Time.deltaTime;//定义最大改变速度
		Vector3 velocityChangeVector = (desiredVelocity - velocity);//定义速度改变向量
		if (velocityChangeVector.sqrMagnitude > maxVelocityChange * maxVelocityChange) {//满足条件时
			velocityChangeVector = velocityChangeVector.normalized * maxVelocityChange;//计算速度改变向量
		}
		
		if (grounded || canControl)//当落地或者可控
			velocity += velocityChangeVector;//改变速度
		
		if (grounded) {//当落地
			velocity.y = Mathf.Min(velocity.y, 0);//计算速度y分量
		}
		return velocity;//返回速度
	}
	
	private Vector3 ApplyGravityAndJumping (Vector3 velocity) {
	
		if (!inputJump || !canControl) {//当没有跳起或者不可控
			jumping.holdingJumpButton = false;//设置标志位
			jumping.lastButtonDownTime = -100;//赋值
		}
		
		if (inputJump && jumping.lastButtonDownTime < 0 && canControl)//当满足条件时
			jumping.lastButtonDownTime = Time.time;//获取游戏时间并赋值给上一次点下按钮时间
		
		if (grounded)//如果落地
			velocity.y = Mathf.Min(0, velocity.y) - movement.gravity * Time.deltaTime;//计算速度y分量
		else {
			velocity.y = movement.velocity.y - movement.gravity * Time.deltaTime;//计算速度y分量
			
			if (jumping.jumping && jumping.holdingJumpButton) {//如果跳起且按住起跳按钮
				if (Time.time < jumping.lastStartTime + jumping.extraHeight / CalculateJumpVerticalSpeed(jumping.baseHeight)) {//如果满足条件
					velocity += jumping.jumpDir * movement.gravity * Time.deltaTime;//计算速度
				}
			}
			
			velocity.y = Mathf.Max (velocity.y, -movement.maxFallSpeed);//计算速度y分量
		}
			
		if (grounded) {//如果落地
			if (jumping.enabled && canControl && (Time.time - jumping.lastButtonDownTime < 0.2)) {//如果满足条件
				grounded = false;//设置标志位
				jumping.jumping = true;//设置标志位
				jumping.lastStartTime = Time.time;//赋值
				jumping.lastButtonDownTime = -100;//赋值
				jumping.holdingJumpButton = true;//设置标志位
				
				if (TooSteep()) {//调用方法判断是否太陡峭
					jumping.jumpDir = Vector3.Slerp(Vector3.up, groundNormal, jumping.steepPerpAmount);//计算跳起方向
				}
				else {
					jumping.jumpDir = Vector3.Slerp(Vector3.up, groundNormal, jumping.perpAmount);//计算跳起方向
				}
				
				velocity.y = 0;//赋值
				velocity += jumping.jumpDir * CalculateJumpVerticalSpeed (jumping.baseHeight);//计算速度
				
				if (movingPlatform.enabled &&
					(movingPlatform.movementTransfer == PlayerMovementTransferOnJump.InitTransfer ||
					movingPlatform.movementTransfer == PlayerMovementTransferOnJump.PermaTransfer)
				) {//如果满足条件
					movement.frameVelocity = movingPlatform.platformVelocity;//计算每帧速度
					velocity += movingPlatform.platformVelocity;//计算速度
				}
				
				SendMessage("OnJump", SendMessageOptions.DontRequireReceiver);//发送消息，调用OnJump方法
			}
			else {
				jumping.holdingJumpButton = false;//设置标志位
			}
		}
		
		return velocity;//返回速度
	}
	
	void OnControllerColliderHit (ControllerColliderHit hit) {
		if (hit.normal.y > 0 && hit.normal.y > groundNormal.y && hit.moveDirection.y < 0) {//如果满足条件
			if ((hit.point - movement.lastHitPoint).sqrMagnitude > 0.001f || lastGroundNormal == Vector3.zero)//如果满足条件
				groundNormal = hit.normal;//赋值
			else
				groundNormal = lastGroundNormal;//赋值
			
			movingPlatform.hitPlatform = hit.collider.transform;//赋值
			movement.hitPoint = hit.point;//赋值
			movement.frameVelocity = Vector3.zero;//赋值
		}
		
		#region custom code
		if(pushing.canPush){//如果允许推
			Rigidbody body = hit.collider.attachedRigidbody;//得到射线检测到的对象上附加的刚体
			if (body == null || body.isKinematic)//如果刚体不存在或者刚体的isKinematic参数为假
				return;//返回
	
			if (hit.moveDirection.y < -0.3f)//如果被推动的对象比角色矮
				return;//返回
	
			Vector3 pushDir = new Vector3 (hit.moveDirection.x, 0, hit.moveDirection.z);//计算推动的方向的向量
		
			body.velocity = pushDir * pushing.pushPower;//设置速度
		}
		#endregion
	}
	
	private IEnumerator SubtractNewPlatformVelocity () {
		if (movingPlatform.enabled &&
			(movingPlatform.movementTransfer == PlayerMovementTransferOnJump.InitTransfer ||
			movingPlatform.movementTransfer == PlayerMovementTransferOnJump.PermaTransfer)
		) {//如果满足条件
			if (movingPlatform.newPlatform) {//如果是新平台
				Transform platform = movingPlatform.activePlatform;//赋值
				yield return new WaitForFixedUpdate();//等待FixedUpdate执行一次
				yield return new WaitForFixedUpdate();//等待FixedUpdate执行一次
				if (grounded && platform == movingPlatform.activePlatform)
					yield return 1;//等待一帧
			}
			movement.velocity -= movingPlatform.platformVelocity;//计算速度
		}
	}
	
	private bool MoveWithPlatform () {
		return (
			movingPlatform.enabled
			&& (grounded || movingPlatform.movementTransfer == PlayerMovementTransferOnJump.PermaLocked)
			&& movingPlatform.activePlatform != null
		);//返回是否随平台移动的布尔值
	}
	
	private Vector3 GetDesiredHorizontalVelocity () {
		Vector3 desiredLocalDirection = tr.InverseTransformDirection(inputMoveDirection);//定义理想本地速度
		float maxSpeed = MaxSpeedInDirection(desiredLocalDirection);//调用方法计算移动方向上的最大速度
		if (grounded) {//如果落地
			// Modify max speed on slopes based on slope speed multiplier curve
			float movementSlopeAngle = Mathf.Asin(movement.velocity.normalized.y)  * Mathf.Rad2Deg;//计算坡度
			maxSpeed *= movement.slopeSpeedMultiplier.Evaluate(movementSlopeAngle);//计算最大速度
		}
		return tr.TransformDirection(desiredLocalDirection * maxSpeed);//返回结果
	}
	
	private Vector3 AdjustGroundVelocityToNormal (Vector3 hVelocity, Vector3 groundNormal) {
		Vector3 sideways = Vector3.Cross(Vector3.up, hVelocity);//计算
		return Vector3.Cross(sideways, groundNormal).normalized * hVelocity.magnitude;//返回计算结果
	}
	
	private bool IsGroundedTest () {//是否落地测试
		return (groundNormal.y > 0.01f);//返回
	}
	
	float GetMaxAcceleration (bool grounded) {//得到最大加速度
		if (grounded)//如果落地
			return movement.maxGroundAcceleration;//返回地面上的最大加速度
		else
			return movement.maxAirAcceleration;//返回空中的最大加速度
	}
	
	float CalculateJumpVerticalSpeed (float targetJumpHeight) {//计算起跳的水平速度
		return Mathf.Sqrt (2 * targetJumpHeight * movement.gravity);//返回起跳的水平速度
	}
	
	public bool IsJumping () {
		return jumping.jumping;//返回是否起跳标志位值
	}
	
	public bool IsSliding () {
		return (grounded && sliding.enabled && TooSteep());//返回是否滑动布尔值
	}
	
	public bool IsTouchingCeiling () {
		return (movement.collisionFlags & CollisionFlags.CollidedAbove) != 0;//返回是否头部碰到物体布尔值
	}
	
	public bool IsGrounded () {
		return grounded;//返回是否落地标志位
	}
	
	public bool TooSteep () {
		return (groundNormal.y <= Mathf.Cos(controller.slopeLimit * Mathf.Deg2Rad));//返回是否太陡峭标志位
	}
	
	public Vector3 GetDirection () {
		return inputMoveDirection;//返回角色移动方向的向量
	}
	
	public void SetControllable (bool controllable) {
		canControl = controllable;//设置角色是否可控制
	}
	
	float MaxSpeedInDirection (Vector3 desiredMovementDirection) {
		if (desiredMovementDirection == Vector3.zero)//当速度方向为零向量时
			return 0;//返回
		else {
			//计算在移动方向上的最大速度
			float zAxisEllipseMultiplier = (desiredMovementDirection.z > 0 ? movement.maxForwardSpeed : movement.maxBackwardsSpeed) / movement.maxSidewaysSpeed;
			Vector3 temp = new Vector3(desiredMovementDirection.x, 0, desiredMovementDirection.z / zAxisEllipseMultiplier).normalized;//得到单位向量
			float length = new Vector3(temp.x, 0, temp.z * zAxisEllipseMultiplier).magnitude * movement.maxSidewaysSpeed;//计算速度
			return length;//返回速度
		}
	}
	
	void SetVelocity (Vector3 velocity) {
		grounded = false;//设置标志位
		movement.velocity = velocity;//设置速度
		movement.frameVelocity = Vector3.zero;//设置速度方向
		SendMessage("OnExternalVelocity");//发送消息
	}
}
