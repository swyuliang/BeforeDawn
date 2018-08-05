using UnityEngine;
using System.Collections;

public class TransferDoor : MonoBehaviour {

    public GameObject TransferHosp;
    public string TName;
   
	// Use this for initialization
	void Start () {
       
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Player")
        {
            Application.LoadLevel(TName);
            other.transform.position = TransferHosp.transform.position;
        }

    }
}
