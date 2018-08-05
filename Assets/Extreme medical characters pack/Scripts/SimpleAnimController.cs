using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class SimpleAnimController : MonoBehaviour {
	private GameObject target;	
	private Animator anim;	
	private float acceleration, speed;
	
	public List<GameObject> targets = new List<GameObject>();
	public int currentTargetIdx = 0;
	public GameObject cameraAnchor;
		
	// Use this for initialization
	void Start () {				
		UpdateTarget();
	}
	
	// Update is called once per frame
	void Update () {
		/*
		// Control speed with keys
		if( Input.GetKeyDown(KeyCode.UpArrow) )
		{
			acceleration += 1f;
		}
		if( Input.GetKeyDown(KeyCode.DownArrow) )
		{
			 acceleration -= 1f;
		}
		if( Input.GetKeyUp(KeyCode.UpArrow) )
		{
			acceleration -= 1f;
		}
		if( Input.GetKeyUp(KeyCode.DownArrow) )
		{
			 acceleration += 1f;
		}
				
		speed = Mathf.Clamp(speed + (acceleration*Time.deltaTime),0f,1f);
		*/
		anim.SetFloat("speed", speed);
		anim.SetInteger("randomint", Random.Range(0,100));
		
		if( cameraAnchor != null )
			cameraAnchor.transform.position = Vector3.Lerp(cameraAnchor.transform.position, target.transform.position, Time.deltaTime*5);
	}
	
	void UpdateTarget()
	{
		if( !ValidateTargets() )
			return;
			
		target = targets[currentTargetIdx];
		
		// reset parameters in case we already have an animator
		if( anim != null )
		{
			anim.SetFloat("speed", 0f);
			anim.SetInteger("randomint", 0);
		}
		
		anim = target.GetComponent<Animator>();
	}
	
	bool ValidateTargets()
	{
		if( targets.Count == 0 )
			return false;
		
		if( currentTargetIdx < 0 )
			currentTargetIdx = 0;
		if( currentTargetIdx >= targets.Count )
			currentTargetIdx = targets.Count - 1;
		
		return true;
	}
	
	void NextTarget()
	{
		currentTargetIdx++;
		if( currentTargetIdx >= targets.Count )
			currentTargetIdx = 0;
		
		UpdateTarget();
	}
	
	void PreviousTarget()
	{
		currentTargetIdx--;
		if( currentTargetIdx < 0 )
			currentTargetIdx = targets.Count-1;
		
		UpdateTarget();
	}
	
	void OnGUI()
	{			
		if (GUI.Button(new Rect(Screen.width/2-50, Screen.height-100, 50, 50), "<<"))
            PreviousTarget();
		if (GUI.Button(new Rect(Screen.width/2, Screen.height-100, 50, 50), ">>"))
            NextTarget();
		
		speed = GUI.HorizontalSlider (new Rect (Screen.width/2-50, Screen.height-40, 100, 30), speed, 0.0f, 1.0f);
		
		GUIStyle style = GUI.skin.GetStyle("Label");
		style.alignment = TextAnchor.MiddleCenter;
		GUI.Label(new Rect(Screen.width/2-100, 10, 200, 30), target.name);
	}
}
