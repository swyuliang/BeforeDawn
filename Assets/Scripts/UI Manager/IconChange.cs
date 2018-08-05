using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class IconChange : MonoBehaviour {
	public RawImage Reticle;
	public RawImage Pickup;
	public RawImage Talk;
	public LayerMask mask = -1;
	public float distance = 1f;
	private RaycastHit hit;
	private Baoxiang baoxiang;
	private NPC_Dialog npc;
	private Bomb bomb;
	private PickUp pickup;
	private PickUp2 pickup2;
	private elevatorDialog eleDialog;


	void Awake()
	{
		Reticle = GameObject.Find ("Reticle").GetComponent<RawImage> ();
		Pickup = GameObject.Find ("Pickup").GetComponent<RawImage> ();
		Talk = GameObject.Find ("Talk").GetComponent<RawImage> ();

	}

	// Use this for initialization
	void Start () {
		ShowReticle ();
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Physics.Raycast (transform.position, transform.forward, out hit, distance, mask)) {
			if (hit.collider.tag == "NPC") {
				ShowTalk ();
				npc = hit.collider.gameObject.GetComponent<NPC_Dialog> ();
				eleDialog = hit.collider.gameObject.GetComponent<elevatorDialog> ();
				if (npc != null)
					npc.isTouch = true;
				if (eleDialog != null)
					eleDialog.isTouch = true;
				
			} else if (hit.collider.tag == "Pickup") {
				ShowPickup ();
				baoxiang = hit.collider.gameObject.GetComponentInParent<Baoxiang> ();
				pickup = hit.collider.gameObject.GetComponentInParent<PickUp> ();
				pickup2 = hit.collider.gameObject.GetComponentInParent<PickUp2> ();
				if (baoxiang != null)
					baoxiang.isTouch = true;
				if (pickup != null)
					pickup.isTouch = true;
				if (pickup2 != null)
					pickup2.isTouch = true;
			} else if (hit.collider.tag == "Bomb") {
				ShowTalk ();
				bomb = hit.collider.gameObject.GetComponent<Bomb> ();
				if (bomb != null)
					bomb.isTouch = true;
			}
		} else 

			ShowReticle ();

		

	
	
	}

	void ShowPickup()
	{
		Reticle.enabled = false;
		Pickup.enabled = true;
		Talk.enabled = false;
	}

	void ShowTalk()
	{
		Reticle.enabled = false;
		Pickup.enabled = false;
		Talk.enabled = true;
	}

	void ShowReticle()
	{
		Reticle.enabled = true;
		Pickup.enabled = false;
		Talk.enabled = false;
		if (eleDialog != null)
		  if(eleDialog.isTouch)
			eleDialog.isTouch = false;
	}

}
