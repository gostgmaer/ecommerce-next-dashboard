"use client"
import React, { useState } from 'react'
import Heading from './heading'
import Input from '@/components/global/fields/input'
import { useFormik } from 'formik'
import { Country, State, City } from 'country-state-city';
import { Switch } from '@headlessui/react'
import { Select } from '@/components/global/fields/SelectField'
import timezones from 'timezones-list';

const dateFormats = [
    { key: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { key: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { key: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { key: 'MMM DD, YYYY', value: 'MMM DD, YYYY' },
    { key: 'MMMM DD, YYYY', value: 'MMMM DD, YYYY' },
    { key: 'DD MMMM YYYY', value: 'DD MMMM YYYY' },
    { key: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
    { key: 'DD-MM-YYYY', value: 'DD-MM-YYYY' },
    { key: 'MM-DD-YYYY', value: 'MM-DD-YYYY' },
    { key: 'dddd, MMMM DD, YYYY', value: 'dddd, MMMM DD, YYYY' }, // Example: "Saturday, September 14, 2024"
    { key: 'Do MMMM YYYY', value: 'Do MMMM YYYY' }, // Example: "14th September 2024"
    { key: 'YYYY.MM.DD', value: 'YYYY.MM.DD' },
    { key: 'MM/DD/YY', value: 'MM/DD/YY' },
  ];
  

const Blocksetting = () => {

  console.log(timezones);

  const sitesetting ={
    "site_name": "My Website",
    "site_description": "A brief description of the website.",
    "site_logo": "https://example.com/logo.png",
    "site_favicon": "https://example.com/favicon.ico",
    "default_language": "en",
    "timezone": "UTC",
    "maintenance_mode": false,
  
    "meta_title": "Default Meta Title",
    "meta_description": "Default Meta Description.",
    "meta_keywords": "keyword1, keyword2, keyword3",
 
    "facebook_url": "https://facebook.com/yourpage",
    "twitter_url": "https://twitter.com/yourprofile",
    "instagram_url": "https://instagram.com/yourprofile",
    "linkedin_url": "https://linkedin.com/company/yourcompany",
    "youtube_url": "https://youtube.com/yourchannel",
  
  
    
    "payment_methods": ["PayPal", "Stripe", "Cash on Delivery"],
    "tax_rate": 0.07,
    "shipping_option_standard_name": "Standard Shipping",
    "shipping_option_standard_cost": 5.00,
    "shipping_option_standard_estimated_delivery": "5-7 business days",
    "shipping_option_express_name": "Express Shipping",
    "shipping_option_express_cost": 15.00,
    "shipping_option_express_estimated_delivery": "1-2 business days",
  
 
    "google_analytics_id": "UA-XXXXX-Y",
    "facebook_pixel_id": "1234567890",
 

    "recaptcha_site_key": "your-recaptcha-site-key",
    "recaptcha_secret_key": "your-recaptcha-secret-key",
    "max_login_attempts": 5,
 
   
    "social_sharing_enabled": true,
    "social_sharing_platforms": ["Facebook", "Twitter", "LinkedIn", "WhatsApp"],
  
    "newsletter_enabled": true,
    "newsletter_signup_url": "https://example.com/newsletter-signup",
  
    
    "allow_registration": true,
    "email_verification_required": true,
    "default_user_role": "customer",
  
    "comments_enabled": true,
    "comments_moderation_required": true,
    "comments_allowed_file_types": ["jpg", "png", "gif", "pdf"],
    "comments_max_length": 500,
  
    "featured_products_max": 24,
    "featured_products_display_in_homepage": true,
    "featured_products_auto_rotate": true,
  

 
  
    "cache_enabled": true,
    "cache_duration_minutes": 30,
    "lazy_load_images": true,
    "minify_css_js": true,
  

    "audit_logs_enabled": true,
    "audit_log_retention_days": 90,
    "audit_log_activity_types": ["login", "profile_update", "payment", "order"],
  
    "push_notifications_enabled": true,
  
    "email_notifications_enabled": true,
    "sms_notifications_enabled": true,
   
    "dark_mode_enabled": true,
    "dark_mode_auto_detect_system_preferences": true,
  

    "reviews_enabled": true,
    "reviews_moderation": true,
    "reviews_max_length": 500,
 
  }
  
  

    const initialValues =
    {
        no_of_image: "",
        curency: "",
        timezone: "",
        date_format: "",
        time_format: "",
        shop_name: "",
        decription: "",
        company: "", address: "asd asdk askdj jkasd ",
        city: 'abuja',
        state: 'abuja',
        country: 'Nigeria',
        pincode: '900101',
        email: "",
        phone: "",
        website: "",
        tax_percenage: "",
        display_price_tax: true,
        max_login: "",
        allow_cod: true
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, { resetForm }) => {

        },
    });


    return (
        <div className="bg-white max-w-7xl m-auto rounded-xl dark:bg-gray-700 p-5">
            <Heading
                ishow={false}
                data={undefined}
                label={"Setting"}
                btn={undefined}
                url={"/dashboard/setting"} exportevent={undefined} />
            <form
                className="mx-auto  grid rounded-lg"

            >
                <div className=" mt-8 grid p-6 gap-4 sm:grid-cols-2 col-span-full ">
                    <div className="col-span-1">
                        <Input label={"Number of images per product"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("no_of_image"),
                            placeholder: "5",
                        }} classes={undefined} icon={undefined} id={"no_of_image"} />

                        {formik.errors.no_of_image &&
                            formik.touched.no_of_image && (
                                <div className="text-red-500 text-sm">
                                    {formik["errors"]["no_of_image"]}
                                </div>
                            )}
                    </div>
                    <div className="col-span-1">
                    <Select label={"Default currency"} additionalAttrs={{
                            ...formik.getFieldProps("currency"),

                        }} id={"currency"} options={Country.getAllCountries()} optionkeys={{ key: "currency", value: "currency" }} placeholder={"Select"}></Select>

                    
                    </div>
                    <div className="col-span-1">
                    <Select label={"Default time zone"} additionalAttrs={{
                            ...formik.getFieldProps("timezone"),

                        }} id={"timezone"} options={timezones} optionkeys={{ key: "tzCode", value: "label" }} placeholder={"Select"}></Select>

                    
                    </div>
                    <div className="col-span-1">
                    <Select label={"Default Date Format"} additionalAttrs={{
                            ...formik.getFieldProps("date_format"),

                        }} id={"date_format"} options={dateFormats} optionkeys={{ key: "key", value: "value" }} placeholder={"DD/MM/YYYY"}></Select>

                    
                    </div>
                  
                    <div className="col-span-1">
                        <Input label={"Shop name"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("shop_name"),
                            placeholder: "Shop",
                        }} classes={undefined} icon={undefined} id={"shop_name"} />

                      
                    </div>
                    <div className="col-span-1">
                        <Input label={"Company Name"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("company"),
                            placeholder: "5",
                        }} classes={undefined} icon={undefined} id={"company"} />

                       
                    </div>
                 
                    <div className="col-span-1">
                        <Input label={"Address"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("address"),
                            placeholder: "5th suite",
                        }} classes={undefined} icon={undefined} id={"address"} />

                   
                    </div>
                    <div className="">
                        <Select label={"Country"} additionalAttrs={{
                            ...formik.getFieldProps("country"),

                        }} id={"country"} options={Country.getAllCountries()} optionkeys={{ key: "isoCode", value: "name" }} placeholder={"Select"}></Select>
                      
                    </div>


                    <div className=" ">
                        <Select label={"State"} additionalAttrs={{
                            ...formik.getFieldProps("state"),

                        }} id={"state"} options={State.getStatesOfCountry(formik.values.country)} optionkeys={{ key: "isoCode", value: "name" }} placeholder={"Select"}></Select>
                        

                    </div>
                    <div className="  ">
                        <Select label={"City"} additionalAttrs={{
                            ...formik.getFieldProps("city"),

                        }} id={"city"} options={City.getCitiesOfState(formik.values.country,formik.values.state)} optionkeys={{ key: "name", value: "name" }} placeholder={"Select"}></Select>
                       
                    </div>
                    <div className="col-span-1">
                        <Input label={"Post Code"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("pincode"),
                            placeholder: "121235",
                        }} classes={undefined} icon={undefined} id={"pincode"} />

                     
                    </div>
                    <div className="col-span-1">
                        <Input label={"Contact"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("phone"),
                            placeholder: "1111111111",
                        }} classes={undefined} icon={undefined} id={"phone"} />

                     
                    </div>
                    <div className="col-span-1">
                        <Input label={"Email"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("email"),
                            placeholder: "info@mail.com",
                        }} classes={undefined} icon={undefined} id={"email"} />

                      
                    </div>
                    <div className="col-span-1">
                        <Input label={"Web site"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("website"),
                            placeholder: "https://web.com",
                        }} classes={undefined} icon={undefined} id={"website"} />

                      
                    </div>
                    <div className="col-span-1">
                        <Input label={"Maximum Login Try"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("max_login"),
                            placeholder: "2",
                        }} classes={undefined} icon={undefined} id={"max_login"} />

                    </div>
                    <div className="col-span-full">
                        <Switch.Group>
                            <div className="flex flex-col w-full mb-1">
                                <div className='block'>
                                <Switch.Label className=" block text-sm capitalize font-medium text-gray-600  mb-1">Enable Cash On Delivery</Switch.Label>
                                <div className='flex items-center peer  w-full transition duration-200  rounded-md bg-transparent  false'>
                                <Switch
                                    checked={formik.values.allow_cod}
                                    onChange={(value) => formik.setFieldValue('allow_cod', value)}
                               
                                    className={`${formik.values.allow_cod ? 'bg-blue-600' : 'bg-gray-200'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                >
                                    <span
                                        className={`${formik.values.allow_cod ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>

                                </div>
                            
                                </div>
                            </div>
                        </Switch.Group>

                       
                    </div>
                    <div className="col-span-full">
                 <hr></hr>
                      
                  


                    </div>
                    <div className="col-span-full grid grid-cols-2">
                    <Switch.Group>
                            <div className="flex flex-col w-full mb-1">
                                <div className='block'>
                                <Switch.Label className=" block text-sm capitalize font-medium text-gray-600  mb-1">Enable Product Price include Tax</Switch.Label>
                                <div className='flex items-center peer  w-full transition duration-200  rounded-md bg-transparent  false'>
                                <Switch
                                    checked={formik.values.display_price_tax}
                                    onChange={(value) => formik.setFieldValue('display_price_tax', value)}
                                    className={`${formik.values.display_price_tax ? 'bg-blue-600' : 'bg-gray-200'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                >
                                    <span
                                        className={`${formik.values.display_price_tax ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>

                                </div>
                            
                                </div>
                            </div>
                        </Switch.Group>
                      
                  


                    </div>
                    <div className="col-span-1">
                        <Input label={"Tax Percentage (%)"} type={"text"} additionalAttrs={{
                            ...formik.getFieldProps("tax_percenage"),
                            placeholder: "5",
                        }} classes={undefined} icon={undefined} id={"tax_percenage"} />

                        {formik.errors.tax_percenage &&
                            formik.touched.tax_percenage && (
                                <div className="text-red-500 text-sm">
                                    {formik["errors"]["tax_percenage"]}
                                </div>
                            )}
                    </div>
                </div>





                <div className="sticky bottom-0 left-0 right-0 py-4 p-6 bg-white  flex items-center justify-end gap-4 border-t ">
                    <button
                        className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 min-w-max @xl:w-auto"
                        type="submit"

                    >
                        Update
                    </button>

                </div>
            </form>

        </div>
    )
}

export default Blocksetting