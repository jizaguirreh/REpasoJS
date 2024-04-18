using Repaso.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//https://www.udemy.com/course/c-aspnet-mvc-ajax-json-boostrap-javascript/?couponCode=ST8MT40924

namespace Repaso.Controllers
{
    public class RepasoHTMLController : Controller
    {
        // GET: RepasoHTML
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Tabla()
        {
            return View();
        }


        public ActionResult ComboBox()
        {
            return View();
        }


        public ActionResult TablaJS()
        {
            return View();
        }


        public ActionResult ComboBoxJS()
        {
            return View();
        }


        public JsonResult listarPersonas()
        {
            List<Persona> listaPersona = new List<Persona>
            {
                new Persona {idPersona=1, nombre="Pedro", apellidoPaterno="Perez"},
                new Persona {idPersona=2, nombre="Jose", apellidoPaterno="Fonseca"},
                new Persona {idPersona=3, nombre="Lucho", apellidoPaterno="Carmona"}
            };
            return Json(listaPersona,JsonRequestBehavior.AllowGet);
        }


        public JsonResult llenarComboPersonas()
        {
            List<Persona> listaPersona = new List<Persona>
            {
                new Persona {idPersona=1, nombre="Pedro"},
                new Persona {idPersona=2, nombre="Jose"},
                new Persona {idPersona=3, nombre="Lucho"}
            };
            return Json(listaPersona, JsonRequestBehavior.AllowGet);
        }



















        // GET: RepasoHTML/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: RepasoHTML/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: RepasoHTML/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: RepasoHTML/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: RepasoHTML/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: RepasoHTML/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: RepasoHTML/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
